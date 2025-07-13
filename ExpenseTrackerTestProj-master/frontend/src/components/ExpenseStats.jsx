import { useEffect, useState } from "react";
import styles from "./ExpenseStats.module.css";
import {
  fetchStatsDays,
  fetchStatsWeek,
  fetchStatsMonth
} from "../api/expensesApi";

export default function ExpenseStats({ telegramId }) {
  const [dailyStats, setDailyStats] = useState([]);
  const [weekTotal, setWeekTotal] = useState(0);
  const [monthTotal, setMonthTotal] = useState(0);

  useEffect(() => {
    if (!telegramId) return;

    fetchStatsDays(telegramId).then(setDailyStats);
    fetchStatsWeek(telegramId).then((data) => setWeekTotal(data.total ?? 0));
    fetchStatsMonth(telegramId).then((data) => setMonthTotal(data.total ?? 0));
  }, [telegramId]);

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
