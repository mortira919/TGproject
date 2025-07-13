// ✅ expensesApi.js (production-ready)
import { WebApp } from "@twa-dev/sdk";

// 👇 Укажи production URL вместо локального
const API_URL = "https://tg-expense-backend.onrender.com";

export async function fetchExpenses(telegramId) {
  const res = await fetch(`${API_URL}/expenses?telegram_id=${telegramId}`);
  return res.json();
}

export async function addExpense(expense, telegramId) {
  const res = await fetch(`${API_URL}/expenses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...expense, telegram_id: telegramId }),
  });
  return res.json();
}

export async function deleteExpense(id) {
  if (!id) throw new Error("Нет ID для удаления!");
  const res = await fetch(`${API_URL}/expenses/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Ошибка при удалении расхода");
  return res.json();
}

export async function updateExpense(id, expense) {
  if (!id) throw new Error("Нет ID для обновления!");
  const res = await fetch(`${API_URL}/expenses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });
  if (!res.ok) throw new Error("Ошибка при обновлении расхода");
  return res.json();
}

export async function fetchStatsDays(telegramId) {
  const res = await fetch(`${API_URL}/stats/days?telegram_id=${telegramId}`);
  return res.json();
}

export async function fetchStatsWeek(telegramId) {
  const res = await fetch(`${API_URL}/stats/week?telegram_id=${telegramId}`);
  return res.json();
}

export async function fetchStatsMonth(telegramId) {
  const res = await fetch(`${API_URL}/stats/month?telegram_id=${telegramId}`);
  return res.json();
}
