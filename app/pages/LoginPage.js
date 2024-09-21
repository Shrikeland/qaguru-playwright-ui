import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailField = page.locator('input[name="email"]');
    this.passwordField = page.locator('input[name="password"]');
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.errorMessage = page.locator(".error-messages");
  }

  async login(email = "", password = "") {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.innerText();
  }
}
