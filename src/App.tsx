import { useEffect, useState } from "react";

type Todo = {
  id: number;
  text: string;
};

const STORAGE_KEY = "offline_todos";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  // Cargar desde localStorage al inicio (offline-friendly)
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setTodos(JSON.parse(raw));
      } catch {
        console.warn("No se pudo parsear los datos guardados");
      }
    }
  }, []);

  // Guardar cada vez que cambien los todos
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    const text = input.trim();
    if (!text) return;
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text },
    ]);
    setInput("");
  };

  const removeTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div style={{ padding: 16, maxWidth: 480, margin: "0 auto" }}>
      <h1>📝 Mi App Offline</h1>
      <p>Puedes usarla sin internet. Tus notas se guardan en este dispositivo.</p>

      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        <input
          style={{ flex: 1, padding: 8 }}
          placeholder="Escribe algo..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addTodo}>Agregar</button>
      </div>

      <ul style={{ marginTop: 16, paddingLeft: 16 }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
            <span>{todo.text}</span>
            <button onClick={() => removeTodo(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
