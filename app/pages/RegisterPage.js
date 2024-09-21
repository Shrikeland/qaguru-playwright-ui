import { BasePage } from "./BasePage";

export class RegisterPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailField = page.getByPlaceholder("Email");
    this.passwordField = this.page.getByPlaceholder("Password");
    this.usernameField = this.page.getByPlaceholder("Your Name");
    this.signupButton = this.page.getByRole("button", { name: "Sign up" });
  }

  async register(userName = "", userEmail = "", userPassword = "") {
    await this.usernameField.click();
    await this.usernameField.fill(userName);
    await this.emailField.click();
    await this.emailField.fill(userEmail);
    await this.passwordField.click();
    await this.passwordField.fill(userPassword);
    await this.signupButton.click();
  }

  async enterUsername(userName) {
    await this.usernameField.click();
    await this.usernameField.fill(userName);
  }

  async enterEmail(userEmail) {
    await this.emailField.click();
    await this.emailField.fill(userEmail);
  }

  async enterPassword(userPassword) {
    await this.passwordField.click();
    await this.passwordField.fill(userPassword);
  }

  async clickSignup() {
    await this.signupButton.click();
  }
}
