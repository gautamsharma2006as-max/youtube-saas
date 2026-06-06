import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req: Request) {
  const { accessToken, title, description } = await req.json();

  if (!accessToken) {
    return NextResponse.json({
      success: false,
      message: "No access token",
    });
  }

  const youtube = google.youtube({
    version: "v3",
    auth: accessToken,
  });

  try {
    const response = await youtube.videos.insert({
      part: ["snippet", "status"],
      requestBody: {
        snippet: {
          title,
          description,
        },
        status: {
          privacyStatus: "private",
        },
      },
    });

    return NextResponse.json({
      success: true,
      videoId: response.data.id,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
