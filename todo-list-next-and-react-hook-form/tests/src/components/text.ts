import { expect, Locator, Page } from "@playwright/test";

export class Text {
  private readonly scope: Locator | Page;
  private readonly testId: string;

  constructor({ scope, testId }: { scope: Locator | Page; testId: string }) {
    this.scope = scope;
    this.testId = testId;
  }

  private get text(): Locator {
    return this.scope.getByTestId(this.testId);
  }

  async あること(): Promise<void> {
    await expect(this.text).toBeVisible();
  }

  async ないこと(): Promise<void> {
    await expect(this.text).not.toBeVisible();
  }

  async 次の値を含むこと(text: string) {
    await expect(this.text).toContainText(text);
  }

  async 次の値がないこと(text: string) {
    await expect(this.text).not.toContainText(text);
  }
}
