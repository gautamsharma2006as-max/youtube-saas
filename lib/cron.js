import fs from "fs";
import fetch from "node-fetch";
import { generateAIContent } from "./gemini";
import { generateThumbnail } from "./thumbnail";
import { generateVideoMeta } from "./ai";
import { getData, updateStatus } from "./db";
import { google } from "googleapis";

export function startScheduler() {
  console.log("⏰ Scheduler started");

  setInterval(async () => {
    try {
      const data = getData();
      if (!data || data.length === 0) return;

      const video = data.find((v) => v.status === "pending");
      if (!video) {
        console.log("📭 No pending videos");
        return;
      }

      video.retryCount = video.retryCount || 0;
      console.log("🎬 Uploading:", video.topic);

      const accessToken = process.env.GOOGLE_ACCESS_TOKEN;
      if (!accessToken) {
        console.log("❌ Login token missing");
        return;
      }

      console.log("🚀 Upload starting:", video.topic);

      // AI Content and Thumbnail Generation
      const ai = await generateAIContent(video.topic, video.channelName);
      
      const youtube = google.youtube({
        version: "v3",
        auth: accessToken,
      });

      console.log("📤 Uploading to YouTube...");
      
      const response = await youtube.videos.insert({
        part: ["snippet", "status"],
        requestBody: {
          snippet: {
            title: ai.title,
            description: ai.description,
            categoryId: "22",
          },
          status: {
            privacyStatus: "private",
          },
        },
      });

      if (response?.data?.id) {
        updateStatus(video.id, "done");
        console.log("🟢 Upload DONE");
        console.log("✅ Upload successful! Video ID:", response.data.id);
      } else {
        throw new Error("No video ID returned from YouTube API");
      }

    } catch (err) {
      console.log("❌ Upload failed:", err.message);

      // Get the current pending video again to handle retry count safely
      const data = getData();
      const video = data?.find((v) => v.status === "pending");

      if (video) {
        video.retryCount = (video.retryCount || 0) + 1;

        if (video.retryCount < 3) {
          console.log(`🔁 Retry kar raha hai: ${video.retryCount}/3`);
          return;
        }

        updateStatus(video.id, "failed");
        console.log("❌ Max retries reached. Status updated to FAILED");
      }
    }
  }, 60000);
}

