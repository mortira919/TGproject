import { useEffect, useState } from "react";
import styles from "./ExpenseStats.module.css";
import {
  fetchStatsDays,
  fetchStatsWeek,
  fetchStatsMonth
} from "../api/expensesApi";

export default function ExpenseStats() {
  const [dailyStats, setDailyStats] = useState([]);
  const [weekTotal, setWeekTotal] = useState(0);
  const [monthTotal, setMonthTotal] = useState(0);

  useEffect(() => {
    fetchStatsDays().then(setDailyStats);
    fetchStatsWeek().then((data) => setWeekTotal(data.total ?? 0));
    fetchStatsMonth().then((data) => setMonthTotal(data.total ?? 0));
  }, []);

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
