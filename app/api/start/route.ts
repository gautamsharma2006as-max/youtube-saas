import { NextResponse } from "next/server";
import { startScheduler } from "@/lib/cron";

let started = false;

export async function GET() {
  if (!started) {
    startScheduler();
    started = true;
  }

  return NextResponse.json({
    success: true,
    message: "Scheduler running",
  });
}
