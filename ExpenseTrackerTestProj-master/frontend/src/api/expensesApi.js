// src/api/expensesApi.js
import { WebApp } from "@twa-dev/sdk";

// 🌍 Production backend
const API_URL = "https://tg-expense-backend.onrender.com";

// ✅ Получение всех расходов
export async function fetchExpenses(telegramId) {
  const res = await fetch(`${API_URL}/expenses?telegram_id=${telegramId}`);
  if (!res.ok) throw new Error("Ошибка при получении расходов");
  return res.json();
}

// ✅ Добавление расхода
export async function addExpense(expense) {
  const telegramId = WebApp?.initDataUnsafe?.user?.id;
  if (!telegramId && !expense.telegram_id) throw new Error("telegram_id не найден");

  const bodyData = {
    ...expense,
    telegram_id: telegramId ?? expense.telegram_id,
  };

  const res = await fetch(`${API_URL}/expenses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyData),
  });

  if (!res.ok) throw new Error("Ошибка при добавлении расхода");
  return res.json();
}

// ✅ Удаление расхода
export async function deleteExpense(id) {
  if (!id) throw new Error("Нет ID для удаления!");

  const res = await fetch(`${API_URL}/expenses/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Ошибка при удалении расхода");
  return res.json();
}

// ✅ Обновление расхода
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

// ✅ Статистика по дням
export async function fetchStatsDays(telegramId) {
  const res = await fetch(`${API_URL}/stats/days?telegram_id=${telegramId}`);
  if (!res.ok) throw new Error("Ошибка при получении статистики по дням");
  return res.json();
}

// ✅ Статистика за 7 дней
export async function fetchStatsWeek(telegramId) {
  const res = await fetch(`${API_URL}/stats/week?telegram_id=${telegramId}`);
  if (!res.ok) throw new Error("Ошибка при получении статистики за неделю");
  return res.json();
}

// ✅ Статистика за 30 дней
export async function fetchStatsMonth(telegramId) {
  const res = await fetch(`${API_URL}/stats/month?telegram_id=${telegramId}`);
  if (!res.ok) throw new Error("Ошибка при получении статистики за месяц");
  return res.json();
}


export async function fetchStatsCategories(telegramId) {
  const res = await fetch(`${API_URL}/stats/categories?telegram_id=${telegramId}`);
  if (!res.ok) throw new Error("Ошибка при получении статистики по категориям");
  return res.json();
}
