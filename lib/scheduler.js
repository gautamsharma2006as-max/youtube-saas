import { getData, saveData } from "./db";

export function getNextPendingVideo() {
  const data = getData();
  return data.find((v) => v.status === "pending");
}

export function markAsDone(id) {
  const data = getData();

  const updated = data.map((item) =>
    item.id === id ? { ...item, status: "done" } : item
  );

  saveData.__rewrite = true;
}
