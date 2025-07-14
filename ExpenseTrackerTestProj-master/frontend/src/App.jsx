import React, { useEffect, useState } from "react";
import { WebApp } from "@twa-dev/sdk";
import ExpenseTracker from "./components/ExpenseTracker";
import ExpenseStats from "./components/ExpenseStats";

function App() {
  const [telegramId, setTelegramId] = useState(null);

  useEffect(() => {
    console.log("📦 WebApp:", WebApp);
    console.log("📦 initDataUnsafe:", WebApp.initDataUnsafe);

    if (typeof WebApp !== "undefined" && WebApp.initDataUnsafe?.user) {
      try {
        WebApp.ready();
        WebApp.expand();

        const user = WebApp.initDataUnsafe.user;
        console.log("✅ Telegram WebApp user:", user);
        setTelegramId(user.id.toString());
      } catch (error) {
        console.error("❌ Ошибка при инициализации WebApp SDK:", error);
      }
    } else {
      console.warn("⚠️ WebApp SDK недоступен или initData пуст. Проверь, открыт ли через Telegram.");
      // setTelegramId("123456789"); // <- временный fallback, если хочешь тестировать вне Telegram
    }
  }, []);

  if (!telegramId)
    return (
      <div>
        Загрузка... Убедись, что ты открыл мини-приложение через Telegram
      </div>
    );

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
