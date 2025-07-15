import { useEffect, useState } from "react";
import {
  fetchExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
} from "../api/expensesApi";
import AddExpenseForm from "./AddExpenseForm";

export default function ExpenseTracker({ telegramId, children }) {
  const [expenses, setExpenses] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    if (telegramId) {
      loadExpenses();
    }
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
    const preparedExpense = {
      ...expense,
      amount: Number(expense.amount),
      telegram_id: telegramId,
    };

    if (editing) {
      await updateExpense(Number(editing.id), preparedExpense);
      setEditing(null);
    } else {
      await addExpense(preparedExpense);
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
      <AddExpenseForm
        onSave={handleSave}
        initialData={editing}
        telegramId={telegramId}
      />

      {children?.(expenses)}
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
