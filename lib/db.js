import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data.json");

// file create if not exists
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([]));
}

export function getData() {
  return JSON.parse(fs.readFileSync(filePath));
}

export function saveData(item) {
  const data = getData();

  data.push({
    id: Date.now(),
    status: "pending",
    ...item,
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
export function updateStatus(id, status) {
  const data = getData();

  const updated = data.map((item) =>
    item.id === id ? { ...item, status } : item
  );

  fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));
}
export function deleteVideo(id) {
  const data = getData();

  const updated = data.filter(
    (item) => item.id !== id
  );

  fs.writeFileSync(
    filePath,
    JSON.stringify(updated, null, 2)
  );
}
