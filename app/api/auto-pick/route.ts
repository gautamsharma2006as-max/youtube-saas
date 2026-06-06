import { NextResponse } from "next/server";
import { getData } from "@/lib/db";

export async function GET() {
  const data = getData();

  const video = data.find((v) => v.status === "pending");

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
