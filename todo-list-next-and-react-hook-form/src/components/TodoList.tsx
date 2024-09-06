"use client";
import { Todo } from "@/lib/validate";
import { toggleTodoAction, deleteTodoAction } from "@/app/actions";

export function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <ul className="mt-4" data-testid="todo-items">
      {todos.map(
        (todo) =>
          todo.id !== undefined && (
            <li
              key={todo.id}
              className="flex items-center gap-2 mb-2"
              data-testid="todo-item"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodoAction(todo.id!, !todo.completed)}
              />
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </span>
              <form action={() => deleteTodoAction(todo.id!)}>
                <button type="submit" className="ml-2 text-red-500">
                  Delete
                </button>
              </form>
            </li>
          )
      )}
    </ul>
  );
}
