import { test, expect } from "@playwright/test";
import { Todoページ } from "./src/pages/todo";
import { resetDatabase } from "./src/system/database.js";
import { Todo機能 } from "./src/features/todo";

test.beforeEach(async ({}) => {
  await resetDatabase();
});

test.describe("Todoリスト", () => {
  test("新たなTODOを追加できる", async ({ page }) => {
    await new Todo機能(page).新たなTodoを追加する("ご飯を食べる");
  });

  test("TODOを削除できる", async ({ page }) => {
    await new Todo機能(page).新たなTodoを追加する("ご飯を食べる");
    await new Todo機能(page).既存のTodoを削除する();
  });
});
