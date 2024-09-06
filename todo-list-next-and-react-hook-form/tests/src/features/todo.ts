import { Page } from "@playwright/test";
import { Todoページ } from "../pages/todo";

export class Todo機能 {
  private readonly Todoページ: Todoページ;

  constructor(private readonly page: Page) {
    this.Todoページ = new Todoページ(page);
  }

  async 新たなTodoを追加する(title: string) {
    await this.Todoページ.開く();

    await this.Todoページ.todoフォーム.入力する(title);
    await this.Todoページ.追加ボタン.クリックする();
    await this.Todoページ.追加されたTodoリスト.次の値を含むこと(title);
  }

  async 既存のTodoを削除する() {
    await this.Todoページ.開く();

    await this.Todoページ.削除ボタン.クリックする();
    await this.Todoページ.追加されたTodoリスト.ないこと();
  }
}
