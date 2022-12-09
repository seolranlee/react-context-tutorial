import { createContext, useContext, useMemo, useRef, useState } from "react";

const TodosValueContext = createContext();
const TodosActionsContext = createContext();

function TodosProvider({ children }) {
  const idRef = useRef(3);
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "밥먹기",
      done: true,
    },
    {
      id: 2,
      text: "잠자기",
      done: false,
    },
  ]);

  const actions = useMemo(
    () => ({
      add(text) {
        const id = idRef.current;
        idRef.current += 1;
        setTodos((prev) => [
          ...prev,
          {
            id,
            text,
            done: false,
          },
        ]);
      },
      toggle(id) {
        setTodos((prev) =>
          prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  done: !item.done,
                }
              : item
          )
        );
      },
      remove(id) {
        setTodos((prev) => prev.filter((item) => item.id !== id));
      },
    }),
    []
  );

  return (
    <TodosActionsContext.Provider value={actions}>
      <TodosValueContext.Provider value={todos}>
        {children}
      </TodosValueContext.Provider>
    </TodosActionsContext.Provider>
  );
}

function useTodosValue() {
  const value = useContext(TodosValueContext);
  if (value === undefined) {
    throw new Error("useTodosValue should be used witin TodosProvider");
  }
  return value;
}

function useTodosActions() {
  const value = useContext(TodosActionsContext);
  if (value === undefined) {
    throw new Error("useTodosActions should be used witin TodosProvider");
  }
  return value;
}

function Value() {
  console.log("Value");
  const todos = useTodosValue();
  return (
    todos.length && (
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.id}. {todo.text} {todo.done ? "완료" : "미완료"}{" "}
            <Button id={todo.id} />
          </li>
        ))}
      </ul>
    )
  );
}

function Button({ id }) {
  console.log("Buttons");
  const { toggle, remove } = useTodosActions();
  return (
    <div>
      <button onClick={() => toggle(id)}>toggle</button>
      <button onClick={() => remove(id)}>remove</button>
    </div>
  );
}

function Add() {
  const { add } = useTodosActions();
  return <button onClick={() => add("추가된 todo")}>add</button>;
}

function App() {
  return (
    <TodosProvider>
      <div>
        <Value />
        <Add />
      </div>
    </TodosProvider>
  );
}

export default App;
