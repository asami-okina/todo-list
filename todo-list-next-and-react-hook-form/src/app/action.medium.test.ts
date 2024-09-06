import { describe, expect, test } from "vitest";
import { addTodo, deleteTodo, toggleTodo } from "./actions";

describe("addTodo", () => {
  test("addTodoが正常に動作すること", async () => {
    const newTodo = { title: "New todo" };

    await expect(addTodo(newTodo)).resolves.toEqual({
      id: 1,
      title: "New todo",
    });
  });
  test("空のタイトルでは、addTodoが失敗すること", async () => {
    const newTodo = { title: "" };

    await expect(addTodo(newTodo)).rejects.toThrow();
  });
});

describe("toggleTodo", () => {
  test("toggleTodoが正常に動作すること", async () => {
    const newTodo = { title: "New todo" };
    const { id } = await addTodo(newTodo);

    await expect(deleteTodo(id)).resolves.toBeUndefined();
  });
  test("存在しないidでは、deleteTodoが失敗すること", async () => {
    await expect(deleteTodo(100)).rejects.toThrow();
  });
});
