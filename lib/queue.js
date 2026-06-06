import { getData } from "./db";

export function getNextVideo() {
  const data = getData();

  // pick first pending video
  return data.find((v) => v.status === "pending");
}
