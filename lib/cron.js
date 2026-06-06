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
    const data = getData();

    const video = data.find((v) => v.status === "pending");
video.retryCount = video.retryCount || 0;
    if (!video) {
      console.log("📭 No pending videos");
      return;
    }

    console.log("🎬 Uploading:", video.topic);

try {
  const accessToken = process.env.GOOGLE_ACCESS_TOKEN;

  if (!accessToken) {
    console.log("❌ Login token missing");
    return;
  }

  console.log("🚀 Upload starting:", video.topic);

  const ai = await generateAIContent(video.topic, video.channelName);

  const youtube = google.youtube({
    version: "v3",
    auth: accessToken,
  });

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
  }
} catch (err) {
  console.log("❌ Upload failed:", err.message);

  video.retryCount = (video.retryCount || 0) + 1;

  if (video.retryCount < 3) {
    console.log("🔁 Retrying...");
    return;
  }

  updateStatus(video.id, "failed");
}
  "https://www.googleapis.com/upload/youtube/v3/videos?part=snippet&uploadType=media",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "video/*",
    },
    body: videoStream,
  }
);
      // TEMP: access token env se (abhi demo)
const accessToken = process.env.GOOGLE_ACCESS_TOKEN;

if (!accessToken) {
  console.log("❌ Login token missing");
  return;
}
      if (!accessToken) {
        console.log("❌ No access token found");
        return;
      }
console.log("🚀 Starting YouTube upload for:", video.topic);
console.log("📤 Uploading video...");
      const youtube = google.youtube({
        version: "v3",
        auth: accessToken,
      });
const ai = await generateAIContent(video.topic, video.channelName);
console.log("🚀 Upload starting:", video.topic);

const response = await youtube.videos.insert({
  part: ["snippet", "status"],
  requestBody: {
    snippet: {thumbnails: {
  default: {
    url: thumbnail,
  },
},
title: ai.title,
description: ai.description,
      categoryId: "22",
    },
    status: {
      privacyStatus: "private",
    },
  },
});

console.log("📤 Uploading to YouTube...");
if (response?.data?.id) {
  updateStatus(video.id, "done");
  console.log("🟢 Status updated to DONE");
}
console.log("✅ Upload successful!");
console.log("🎬 Video ID:", response.data.id);
catch (err) {
  console.log("❌ Upload failed:", err.message);

  video.retryCount = (video.retryCount || 0) + 1;

  if (video.retryCount < 3) {
    console.log("🔁 Retry kar raha hai:", video.retryCount);
    return;
  }

  updateStatus(video.id, "failed");
}
  updateStatus(video.id, "failed");
}

  }, 60000);
}
