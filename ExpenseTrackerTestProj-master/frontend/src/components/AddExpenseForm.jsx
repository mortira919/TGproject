import { useEffect, useState } from "react";

export default function AddExpenseForm({ onSave, initialData }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (initialData) {
      setAmount(initialData.amount);
      setCategory(initialData.category);
      setComment(initialData.comment || "");
    } else {
      setAmount("");
      setCategory("");
      setComment("");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      amount: parseFloat(amount),
      category,
      comment,
    });

    setAmount("");
    setCategory("");
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="number"
        placeholder="Сумма"
        step="0.01"
        value={amount}
        required
        onChange={(e) => setAmount(e.target.value)}
        autoFocus
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Категория"
        value={category}
        required
        onChange={(e) => setCategory(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Комментарий"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        {initialData ? "Сохранить изменения" : "Сохранить"}
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginTop: "10px",
  },
  input: {
    padding: "8px",
    fontSize: "14px",
  },
  button: {
    padding: "10px",
    fontSize: "14px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
