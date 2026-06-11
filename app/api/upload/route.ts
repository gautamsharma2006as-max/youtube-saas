import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const topic = formData.get("topic");
    const videoUrl = formData.get("videoUrl");
    const channelName = formData.get("channelName");
    const uploadTime = formData.get("uploadTime");
    const status = formData.get("status");

    return NextResponse.json({
      success: true,
      data: {
        topic,
        videoUrl,
        channelName,
        uploadTime,
        status,
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
