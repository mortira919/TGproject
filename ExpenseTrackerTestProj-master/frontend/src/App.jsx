import React, { useEffect, useState } from "react";
import ExpenseTracker from "./components/ExpenseTracker";
import ExpenseStats from "./components/ExpenseStats";

function App() {
  const [telegramId, setTelegramId] = useState(null);
  const [isTelegram, setIsTelegram] = useState(true);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (tg?.initDataUnsafe?.user?.id) {
      try {
        tg.ready();
        tg.expand();

        const userId = tg.initDataUnsafe.user.id.toString();
        console.log("✅ Telegram user ID:", userId);
        setTelegramId(userId);
      } catch (e) {
        console.error("❌ Ошибка инициализации Telegram SDK:", e);
        setIsTelegram(false);
      }
    } else {
      console.warn("❌ Не внутри Telegram WebApp или нет initDataUnsafe");
      setIsTelegram(false);
    }
  }, []);

  if (!isTelegram) {
    return (
      <div style={styles.container}>
        <h2>⚠️ Открыто вне Telegram</h2>
        <p>
          Пожалуйста, открой мини-приложение через Telegram-бота.
        </p>
      </div>
    );
  }

  if (!telegramId) {
    return (
      <div style={styles.container}>
        <p>⏳ Загрузка Telegram данных...</p>
      </div>
    );
  }

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
    color: "#fff",
    backgroundColor: "#121212",
    minHeight: "100vh",
    textAlign: "center"
  },
  title: {
    textAlign: "center",
  },
  divider: {
    margin: "24px 0",
  },
};

export default App;
