const API_URL = "http://localhost:5001";

export async function fetchExpenses() {
  const res = await fetch(`${API_URL}/expenses`);
  return res.json();
}

export async function addExpense(expense) {
  const res = await fetch(`${API_URL}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  });
  return res.json();
}

export async function deleteExpense(id) {
  if (!id) throw new Error("Нет ID для удаления!");

  const res = await fetch(`http://localhost:5001/expenses/${id}`, {
    method: "DELETE", // <-- добавлено
  });

  if (!res.ok) {
    throw new Error("Ошибка при удалении расхода");
  }

  return res.json();
}





export async function updateExpense(id, expense) {
  if (!id) throw new Error("Нет ID для обновления!");

  const res = await fetch(`http://localhost:5001/expenses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  });

  if (!res.ok) {
    throw new Error("Ошибка при обновлении расхода");
  }

  return res.json();
}

