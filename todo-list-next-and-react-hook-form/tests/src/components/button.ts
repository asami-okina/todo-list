import { Locator, Page, expect } from "@playwright/test";

export class Button {
  private readonly scope: Page | Locator;
  private readonly label: string;

  constructor({ scope, label }: { scope: Page | Locator; label: string }) {
    this.scope = scope;
    this.label = label;
  }

  //  要素
  protected get button() {
    return this.scope.getByRole("button", { name: this.label, exact: true });
  }

  // 動作
  async クリックする(): Promise<void> {
    await this.button.click();
  }

  // 状態
  async あること(): Promise<void> {
    await expect(this.button).toBeVisible();
  }
}
