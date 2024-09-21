import { BasePage } from "./BasePage";

export class MainPage extends BasePage {
  constructor(page) {
    super(page);
    this.menuButton = this.page.locator(".dropdown-toggle");
    this.settingsButton = this.page.getByRole("link", { name: "Settings" });
    this.signupButton = this.page.getByRole("link", { name: "Sign up" });
    this.newArticleLink = this.page.locator('a[href="#/editor"]');
    this.loginLink = this.page.locator('a[href="#/login"]');
    this.emptyListMessage = this.page.getByText("Articles not available.");
    this.globalFeedButton = this.page.getByRole("button", {
      name: "Global Feed",
    });
  }

  async goToRegister() {
    await this.signupButton.click();
  }

  async goToSettings() {
    await this.menuButton.click();
    await this.settingsButton.click();
  }

  async goToEditor() {
    await this.newArticleLink.click();
  }

  async goToLogin() {
    await this.loginLink.click();
  }

  async switchToGlobalFeed() {
    await this.globalFeedButton.click();
  }
}
