import { Locator, Page, expect } from "@playwright/test";

export class Input {
  private readonly scope: Page | Locator;
  private readonly label: string;

  constructor({ scope, label }: { scope: Page | Locator; label: string }) {
    this.scope = scope;
    this.label = label;
  }

  protected get input(): Locator {
    return this.scope.getByLabel(this.label, { exact: true });
  }

  // 動作
  async 入力する(value: string): Promise<void> {
    await this.input.fill(value);
  }

  // 状態
  async あること(): Promise<void> {
    await expect(this.input).toBeVisible();
  }
}
