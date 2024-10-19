import { create } from "zustand";
import { persist } from "zustand/middleware";

type Todo = {
  id: number;
  text: string;
};

type TodoStore = {
  todo: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
  updateTodo: (id: number, text: string) => void;
};
let nextId = 1;
export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todo: [],
      addTodo: (text) =>
        set((state) => ({ todo: [...state.todo, { id: nextId++, text }] })),
      removeTodo: (id) =>
        set((state) => ({ todo: state.todo.filter((item) => item.id !== id) })),
      updateTodo: (id, text) =>
        set((state) => ({
          todo: state.todo.map((item) =>
            item.id === id ? { ...item, text } : item
          ),
        })),
    }),
    { name: "todo" }
  )
);
