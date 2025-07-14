import Database from "better-sqlite3";

const db = new Database("expenses.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount REAL,
    category TEXT,
    comment TEXT,
    date TEXT,
    telegram_id TEXT
  )
`);

export default db;
