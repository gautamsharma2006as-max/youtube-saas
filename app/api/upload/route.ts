import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req: Request) {
  try {
    const { accessToken, title, description } = await req.json();

    // Validate token
    if (!accessToken) {
      return NextResponse.json({
        success: false,
        message: "No access token",
      });
    }

    // Validate title
    if (!title) {
      return NextResponse.json({
        success: false,
        message: "Title is required",
      });
    }

    // Init YouTube API
    const youtube = google.youtube({
      version: "v3",
      auth: accessToken,
    });

    // Upload video metadata
    const response = await youtube.videos.insert({
      part: ["snippet", "status"],
      requestBody: {
        snippet: {
          title: title,
          description: description || "",
        },
        status: {
          privacyStatus: "private",
        },
      },
    });

    return NextResponse.json({
      success: true,
      videoId: response.data.id,
      message: "Video uploaded successfully",
    });

  } catch (error: any) {
    console.error("Upload Error:", error);

    return NextResponse.json({
      success: false,
      message: "Upload failed",
      error: error?.message || "Unknown error",
    });
  }
}
