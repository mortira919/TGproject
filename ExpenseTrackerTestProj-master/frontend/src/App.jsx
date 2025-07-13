import React from "react";
import ExpenseTracker from "./components/ExpenseTracker";
import ExpenseStats from "./components/ExpenseStats";

function App() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Трекер расходов</h1>
      <ExpenseTracker />
      <hr style={styles.divider} />
      <ExpenseStats />
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
