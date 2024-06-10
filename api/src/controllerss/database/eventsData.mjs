import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const events_data = JSON.parse(
  await fs.readFile(path.join(__dirname, "eventsData.json"))
);

export default events_data