import { expect, test } from "@playwright/test";
import { MainPage, LoginPage } from "../app/pages/index";

const url = "https://realworld.qa.guru/#/";

test.describe("Login tests", () => {
  test("System should display an error when user has entered incorrect data", async ({
    page,
  }) => {
    const mainPage = new MainPage(page);
    const loginPage = new LoginPage(page);

    await mainPage.open(url);
    await mainPage.goToLogin();

    await loginPage.login("janeDoe@gmail.com", "VakUSvx,%L5qT7<N");
    await expect(await loginPage.getErrorMessage()).toEqual(
      "Wrong email/password combination"
    );
  });
});
