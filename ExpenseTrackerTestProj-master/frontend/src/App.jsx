import React, { useEffect, useState } from "react";
import { WebApp } from "@twa-dev/sdk";
import ExpenseTracker from "./components/ExpenseTracker";
import ExpenseStats from "./components/ExpenseStats";

function App() {
  const [telegramId, setTelegramId] = useState(null);

  useEffect(() => {
    WebApp.ready();
    WebApp.expand();

    const user = WebApp.initDataUnsafe?.user;
    if (user) {
      console.log("✅ Telegram WebApp user:", user);
      setTelegramId(user.id.toString());
    } else {
      console.warn("⚠️ Не удалось получить Telegram ID");
    }
  }, []);

  if (!telegramId) return <div>Загрузка...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Трекер расходов</h1>
      <ExpenseTracker telegramId={telegramId} />
      <hr style={styles.divider} />
      <ExpenseStats telegramId={telegramId} />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "sans-serif",
  },
  title: {
    textAlign: "center",
  },
  divider: {
    margin: "24px 0",
  },
};

export default App;
