import { useEffect, useState } from "react";

export default function ExpenseStats() {
  const [dailyStats, setDailyStats] = useState([]);
  const [weekTotal, setWeekTotal] = useState(0);
  const [monthTotal, setMonthTotal] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5001/stats/days")
      .then((res) => res.json())
      .then(setDailyStats);

    fetch("http://localhost:5001/stats/week")
      .then((res) => res.json())
      .then((data) => setWeekTotal(data.total ?? 0));

    fetch("http://localhost:5001/stats/month")
      .then((res) => res.json())
      .then((data) => setMonthTotal(data.total ?? 0));
  }, []);

  return (
    <div>
      <h3>Статистика</h3>
      <p>За 7 дней: {weekTotal} ₽</p>
      <p>За 30 дней: {monthTotal} ₽</p>
      <h4>По дням:</h4>
      <ul>
        {dailyStats.map((s, i) => (
          <li key={i}>{s.day}: {s.total} ₽</li>
        ))}
      </ul>
    </div>
  );
}
