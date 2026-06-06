import { startScheduler } from "./cron";

export function initApp() {
  console.log("🚀 Initializing YouTube SaaS...");

  startScheduler();

  console.log("✅ Scheduler started");
}
