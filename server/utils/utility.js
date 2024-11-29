import fs from "fs/promises";

export function generateUnixTimestamp() {
  const date = new Date();
  return Math.floor(date.getTime() / 1000);
}

export async function ensureDirectoryExists(dirPath) {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
}
