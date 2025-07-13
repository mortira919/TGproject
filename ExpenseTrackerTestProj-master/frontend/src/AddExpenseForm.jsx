import { useEffect, useState } from "react";

export default function AddExpenseForm({ onSave, initialData }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [comment, setComment] = useState("");

  // Подставить данные при редактировании
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

    if (!amount || !category) {
      alert("Сумма и категория обязательны!");
      return;
    }

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
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Сумма"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Категория"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="text"
        placeholder="Комментарий"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit">
        {initialData ? "Сохранить изменения" : "Сохранить"}
      </button>
    </form>
  );
}
