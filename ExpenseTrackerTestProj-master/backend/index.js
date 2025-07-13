import express from "express";
import cors from "cors";
import db from "./database.js";

const app = express();
const PORT = 5001;

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// Проверка сервера
app.get("/", (req, res) => {
  res.json({ message: "Backend работает на Node.js!" });
});

// Добавить расход
app.post("/expenses", (req, res) => {
  const { amount, category, comment } = req.body;

  if (!amount || !category) {
    return res.status(400).json({ error: "Amount и category обязательны" });
  }

  const stmt = db.prepare(`
    INSERT INTO expenses (amount, category, comment, date)
    VALUES (?, ?, ?, datetime('now'))
  `);
  const info = stmt.run(amount, category, comment);

  res.json({ id: info.lastInsertRowid });
});

// Получить все расходы
app.get("/expenses", (req, res) => {
  const stmt = db.prepare("SELECT * FROM expenses ORDER BY date DESC");
  const expenses = stmt.all();
  res.json(expenses);
});

// Обновить расход
app.put("/expenses/:id", (req, res) => {
  const id = req.params.id;
  const { amount, category, comment } = req.body;

  const stmt = db.prepare(`
    UPDATE expenses
    SET amount = ?, category = ?, comment = ?
    WHERE id = ?
  `);

  const info = stmt.run(amount, category, comment, id);

  if (info.changes === 0) {
    return res.status(404).json({ error: "Расход не найден" });
  }

  res.json({ success: true });
});

// Удалить расход
app.delete("/expenses/:id", (req, res) => {
  const id = req.params.id;
  const stmt = db.prepare("DELETE FROM expenses WHERE id = ?");
  const info = stmt.run(id);
  res.json({ deleted: info.changes });
});

// Статистика
app.get("/stats/days", (req, res) => {
  const stmt = db.prepare(`
    SELECT strftime('%Y-%m-%d', date) as day, SUM(amount) as total
    FROM expenses
    GROUP BY day ORDER BY day DESC LIMIT 30
  `);
  res.json(stmt.all());
});

app.get("/stats/week", (req, res) => {
  const stmt = db.prepare(`
    SELECT SUM(amount) as total
    FROM expenses
    WHERE date >= datetime('now', '-7 days')
  `);
  res.json(stmt.get());
});

app.get("/stats/month", (req, res) => {
  const stmt = db.prepare(`
    SELECT SUM(amount) as total
    FROM expenses
    WHERE date >= datetime('now', '-30 days')
  `);
  res.json(stmt.get());
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});
