import { useEffect, useState } from "react";
import {
  fetchExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
} from "../api/expensesApi";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseStats from "./ExpenseStats";

export default function ExpenseTracker({ telegramId }) {
  const [expenses, setExpenses] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    loadExpenses();
  }, [telegramId]);

  async function loadExpenses() {
    const data = await fetchExpenses(telegramId);
    setExpenses(data);
  }

  async function handleDelete(id) {
    if (!window.confirm("Удалить этот расход?")) return;
    await deleteExpense(id);
    loadExpenses();
  }

  async function handleSave(expense) {
    if (editing) {
      await updateExpense(Number(editing.id), expense);
      setEditing(null);
    } else {
      await addExpense({ ...expense, telegram_id: telegramId });
    }
    loadExpenses();
  }

  return (
    <div>
      <h2>Мои расходы</h2>
      <ul>
        {expenses.map((exp) => (
          <li key={exp.id}>
            {exp.amount} ₽ — {exp.category} ({exp.comment})
            <button onClick={() => setEditing(exp)} style={styles.editBtn}>✏️</button>
            <button onClick={() => handleDelete(exp.id)} style={styles.delBtn}>🗑</button>
          </li>
        ))}
      </ul>

      <h3>{editing ? "Редактировать расход" : "Добавить расход"}</h3>
      <AddExpenseForm onSave={handleSave} initialData={editing} />

      <hr style={{ margin: "20px 0" }} />
      <ExpenseStats telegramId={telegramId} />
    </div>
  );
}

const styles = {
  delBtn: {
    marginLeft: "10px",
    background: "none",
    border: "none",
    color: "red",
    cursor: "pointer",
    fontSize: "16px",
  },
  editBtn: {
    marginLeft: "10px",
    background: "none",
    border: "none",
    color: "orange",
    cursor: "pointer",
    fontSize: "16px",
  },
};
