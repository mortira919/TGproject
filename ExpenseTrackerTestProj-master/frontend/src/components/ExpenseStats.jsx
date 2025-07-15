import { useEffect, useState } from "react";
import styles from "./ExpenseStats.module.css";
import {
  fetchStatsDays,
  fetchStatsWeek,
  fetchStatsMonth
} from "../api/expensesApi";

export default function ExpenseStats({ telegramId, expenses }) {
  const [dailyStats, setDailyStats] = useState([]);
  const [weekTotal, setWeekTotal] = useState(0);
  const [monthTotal, setMonthTotal] = useState(0);

  useEffect(() => {
    if (!telegramId) return;

    if (expenses) {
      const now = Date.now();
      const weekAgo = now - 7 * 86400000;
      const monthAgo = now - 30 * 86400000;

      const week = expenses
        .filter(e => new Date(e.date).getTime() >= weekAgo)
        .reduce((sum, e) => sum + e.amount, 0);

      const month = expenses
        .filter(e => new Date(e.date).getTime() >= monthAgo)
        .reduce((sum, e) => sum + e.amount, 0);

      const daysMap = new Map();
      for (const exp of expenses) {
        const day = exp.date.slice(0, 10);
        daysMap.set(day, (daysMap.get(day) || 0) + exp.amount);
      }

      const daily = Array.from(daysMap.entries())
        .sort((a, b) => b[0].localeCompare(a[0]))
        .slice(0, 30)
        .map(([day, total]) => ({ day, total }));

      setWeekTotal(week);
      setMonthTotal(month);
      setDailyStats(daily);
    } else {
      // fallback на fetch (если что-то пойдёт не так)
      fetchStatsWeek(telegramId).then((res) => setWeekTotal(res?.total ?? 0));
      fetchStatsMonth(telegramId).then((res) => setMonthTotal(res?.total ?? 0));
      fetchStatsDays(telegramId).then((res) => {
        if (Array.isArray(res)) setDailyStats(res);
      });
    }
  }, [telegramId, expenses]);

  return (
    <div className={styles.statsBlock}>
      <h3>📊 Статистика расходов</h3>
      <p><strong>За 7 дней:</strong> {weekTotal} ₽</p>
      <p><strong>За 30 дней:</strong> {monthTotal} ₽</p>
      <h4>📅 По дням:</h4>
      <ul className={styles.statList}>
        {dailyStats.map((s, i) => (
          <li key={i}>
            <span className={styles.day}>{s.day}</span> —{" "}
            <span className={styles.amount}>{s.total} ₽</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
