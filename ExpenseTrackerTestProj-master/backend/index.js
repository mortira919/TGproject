import express from "express";
import cors from "cors";
import db from "./database.js";
import bot from "./bot.js";

const app = express();
const PORT = process.env.PORT || 5001;

// ===== Middleware =====
app.use(cors());
app.use(express.json());

// ===== Тестовый роут =====
app.get("/", (req, res) => {
  res.json({ message: "✅ Backend работает!" });
});

// ===== API =====
app.post("/expenses", (req, res) => {
  let { amount, category, comment = "", telegram_id } = req.body;

  console.log("📥 POST /expenses", req.body);

  amount = Number(amount);
  telegram_id = String(telegram_id);

  // ✅ Улучшенная валидация
  if (isNaN(amount) || !category || !telegram_id) {
    return res.status(400).json({
      error: "Некорректные данные: amount (number), category и telegram_id обязательны",
    });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO expenses (amount, category, comment, date, telegram_id)
      VALUES (?, ?, ?, datetime('now'), ?)
    `);
    const info = stmt.run(amount, category, comment, telegram_id);
    res.json({ id: info.lastInsertRowid });
  } catch (error) {
    console.error("❌ Ошибка при добавлении расхода:", error);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
});

app.get("/expenses", (req, res) => {
  const { telegram_id } = req.query;
  if (!telegram_id)
    return res.status(400).json({ error: "telegram_id обязателен" });

  const stmt = db.prepare("SELECT * FROM expenses WHERE telegram_id = ? ORDER BY date DESC");
  const expenses = stmt.all(String(telegram_id));
  res.json(expenses);
});

app.put("/expenses/:id", (req, res) => {
  const { amount, category, comment } = req.body;
  const id = req.params.id;

  const stmt = db.prepare(`UPDATE expenses SET amount = ?, category = ?, comment = ? WHERE id = ?`);
  const info = stmt.run(Number(amount), category, comment, id);
  if (info.changes === 0)
    return res.status(404).json({ error: "Расход не найден" });

  res.json({ success: true });
});

app.delete("/expenses/:id", (req, res) => {
  const stmt = db.prepare("DELETE FROM expenses WHERE id = ?");
  const info = stmt.run(req.params.id);
  res.json({ deleted: info.changes });
});

app.get("/stats/days", (req, res) => {
  const { telegram_id } = req.query;
  const stmt = db.prepare(`
    SELECT strftime('%Y-%m-%d', date) as day, SUM(amount) as total
    FROM expenses WHERE telegram_id = ?
    GROUP BY day ORDER BY day DESC LIMIT 30
  `);
  res.json(stmt.all(String(telegram_id)));
});

app.get("/stats/week", (req, res) => {
  const { telegram_id } = req.query;
  const stmt = db.prepare(`
    SELECT SUM(amount) as total
    FROM expenses WHERE date >= datetime('now', '-7 days') AND telegram_id = ?
  `);
  res.json(stmt.get(String(telegram_id)));
});

app.get("/stats/month", (req, res) => {
  const { telegram_id } = req.query;
  const stmt = db.prepare(`
    SELECT SUM(amount) as total
    FROM expenses WHERE date >= datetime('now', '-30 days') AND telegram_id = ?
  `);
  res.json(stmt.get(String(telegram_id)));
});

// ===== DEBUG Webhook Log =====
app.use("/bot", (req, res, next) => {
  console.log("✅ Получен запрос от Telegram Webhook");
  next();
});

// ===== Telegraf Webhook Callback =====
app.use(bot.webhookCallback("/bot"));

// ===== Установка Webhook =====
const WEBHOOK_URL = "https://tg-expense-backend.onrender.com/bot";
bot.telegram.setWebhook(WEBHOOK_URL)
  .then(() => console.log("📡 Webhook установлен:", WEBHOOK_URL))
  .catch((err) => console.error("❌ Ошибка при установке webhook:", err));

// ===== Запуск =====
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});
