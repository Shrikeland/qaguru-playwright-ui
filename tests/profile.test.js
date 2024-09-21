import { expect, test } from "@playwright/test";
import { LoginPage, ProfilePage, MainPage } from "../app/pages/index";

const url = "https://realworld.qa.guru/#/";
const user = {
  email: "janeDoe@gmail.com",
  password: "Z4/X^;hk*sJ8t<&C",
};

test.describe("Profile tests", () => {
  test.beforeEach(async ({ page }) => {
    const mainPage = new MainPage(page);
    const loginPage = new LoginPage(page);

    await mainPage.open(url);
    await mainPage.goToLogin();

    await loginPage.login(user.email, user.password);
  });

  test("User can view his published articles on the profile page", async ({
    page,
  }) => {
    const mainPage = new MainPage(page);
    const profilePage = new ProfilePage(page);
    await expect(mainPage.emptyListMessage).toBeVisible();

    await mainPage.open(url + "profile/Jane Doe");
    await expect(await profilePage.getArticleList()).toEqual(
      "Loading Jane Doe articles..."
    );
  });

  test("User can view his favorite articles on the profile page", async ({
    page,
  }) => {
    const mainPage = new MainPage(page);
    const profilePage = new ProfilePage(page);
    await expect(mainPage.emptyListMessage).toBeVisible();

    await mainPage.open(url + "profile/Jane Doe");
    await profilePage.goToFavoriteArticles();
    await expect(await profilePage.getFavoriteList()).toEqual(
      "Loading Jane Doe favorites articles..."
    );
  });
});
