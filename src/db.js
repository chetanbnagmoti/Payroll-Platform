import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

// ✅ Recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ✅ Database file path
const file = join(__dirname, "..", "data.json");
const defaultData = { payrolls: [], users: [] };

if (!fs.existsSync(file)) {
  fs.writeFileSync(file, JSON.stringify({ payrolls: [], users: [] }, null, 2));
}

const adapter = new JSONFileSync(file);
console.log("Database file path:", file);
const db = new LowSync(adapter, defaultData);
console.log("Database adapter initialized.");

db.read();
if (!db.data || !db.data.payrolls || !db.data.users) {
  db.data = { payrolls: [], users: [] };
  db.write();
}

export default db;
