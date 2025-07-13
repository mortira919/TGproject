// database.js
import Database from "better-sqlite3";

// Создаём (или открываем) базу данных
const db = new Database("expenses.db");

// Создаём таблицу, если нет
db.exec(`
  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount REAL NOT NULL,
    category TEXT NOT NULL,
    comment TEXT,
    date TEXT NOT NULL
  );
`);

export default db;