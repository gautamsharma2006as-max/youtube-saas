import { NextResponse } from "next/server";
import { getNextVideo } from "@/lib/queue";

export async function GET() {
  const video = getNextVideo();

  if (!video) {
    return NextResponse.json({
      success: false,
      message: "No pending videos",
    });
  }

  return NextResponse.json({
    success: true,
    video,
  });
}
