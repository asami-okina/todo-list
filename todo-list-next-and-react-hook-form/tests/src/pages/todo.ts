import { expect, Locator, Page } from "@playwright/test";
import { Input } from "../components/input.js";
import { Button } from "../components/button.js";
import { Text } from "../components/text.js";
export class Todoページ {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async 開く(): Promise<void> {
    await this.page.goto("http://localhost:3001");
  }

  get todoフォーム(): Input {
    return new Input({
      scope: this.page,
      label: "New todo",
    });
  }

  get 追加ボタン(): Button {
    return new Button({
      scope: this.page,
      label: "Add",
    });
  }

  get 削除ボタン() {
    return new Button({
      scope: this.page,
      label: "Delete",
    });
  }

  get 追加されたTodoリスト() {
    return new Text({
      scope: this.page.getByTestId("todo-items"),
      testId: "todo-item",
    });
  }
}
