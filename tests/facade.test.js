import { test, expect } from "@playwright/test";
import { App } from "../app/pages/index";
import { UserBuilder, ArticleBuilder } from "../app/helpers/builders/index";

const url = "https://realworld.qa.guru/#/";
let newUser;
let expectedArticle;
let app;

test.describe("Page Object", () => {
  test.beforeEach(async ({ page }) => {
    newUser = new UserBuilder()
      .addBio()
      .addEmail()
      .addName()
      .addPassword()
      .generate();

    app = new App(page);

    await app.mainPage.open(url);
    await app.mainPage.goToRegister();
    await app.registerPage.register(newUser);
  });

  test("User can change profile info", async ({ page }) => {
    await app.mainPage.goToSettings();
    await app.settingsPage.updateProfile(newUser.bio);
    let profileInfo = await app.settingsPage.getProfile();
    await expect(profileInfo.bio).toHaveText(newUser.bio);
  });

  test("User can publish a new article", async ({ page }) => {
    expectedArticle = new ArticleBuilder()
      .addTitle()
      .addDescription()
      .addBody()
      .addTags()
      .generate();

    let actualArticle;

    await app.mainPage.goToEditor();
    await app.editorPage.publishNewArticle(expectedArticle);

    await expect(app.articlePage.articleHeader).toBeVisible();
    actualArticle = await app.articlePage.getArticle();
    expect(actualArticle.title).toEqual(expectedArticle.title);
    expect(actualArticle.body).toEqual(expectedArticle.body);
    expect(actualArticle.tags).toEqual(expectedArticle.tags);
  });

  test("User can see the saved article in the global feed", async ({
    page,
  }) => {
    await expect(app.mainPage.emptyListMessage).toBeVisible();
    await app.mainPage.switchToGlobalFeed();

    await expect(app.feedPage.articlePreview).toBeVisible();
    await expect(app.feedPage.articleDescription).toBeVisible();
    await expect(app.feedPage.articleTagList).toBeVisible();
  });
});
