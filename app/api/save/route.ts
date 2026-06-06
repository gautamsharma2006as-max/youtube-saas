import { NextResponse } from "next/server";
import { saveData, getData, deleteVideo } from "@/lib/db";

export async function POST(req: Request) {
const formData = await req.formData();

const file = formData.get("file");
const topic = formData.get("topic");
const videoUrl = formData.get("videoUrl");
const channelName = formData.get("channelName");
const uploadTime = formData.get("uploadTime");
const status = formData.get("status");
 saveData({
  file,
  topic,
  videoUrl,
  channelName,
  uploadTime,
  status,
});
  return NextResponse.json({
    success: true,
    message: "Saved successfully",
  });
}

export async function GET() {
  const data = getData();

  return NextResponse.json({
    success: true,
    data,
  });
}
export async function DELETE(req: Request) {
  const { id } = await req.json();

  deleteVideo(id);

  return NextResponse.json({
    success: true,
    message: "Video deleted",
  });
}
