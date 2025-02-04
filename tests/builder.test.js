import { test, expect } from "@playwright/test";
import { UserBuilder, ArticleBuilder } from "../app/helpers/builders/index";
import {
  MainPage,
  RegisterPage,
  SettingsPage,
  EditorPage,
  ArticlePage,
  FeedPage,
} from "../app/pages/index";

const url = "https://realworld.qa.guru/#/";
let newUser;
let expectedArticle;

test.describe("Page Object", () => {
  test.beforeEach(async ({ page }) => {
    newUser = new UserBuilder()
      .addBio()
      .addEmail()
      .addName()
      .addPassword()
      .generate();

    const mainPage = new MainPage(page);
    const registerPage = new RegisterPage(page);

    await mainPage.open(url);
    await mainPage.goToRegister();
    await registerPage.register(newUser);
  });

  test("User can change profile info", async ({ page }) => {
    const mainPage = new MainPage(page);
    const settingsPage = new SettingsPage(page);

    await mainPage.goToSettings();
    await settingsPage.updateProfile(newUser.bio);
    let profileInfo = await settingsPage.getProfile();
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
    const mainPage = new MainPage(page);
    const editorPage = new EditorPage(page);
    const articlePage = new ArticlePage(page);

    await mainPage.goToEditor();
    await editorPage.publishNewArticle(expectedArticle);

    await expect(articlePage.articleHeader).toBeVisible();
    actualArticle = await articlePage.getArticle();
    await expect(actualArticle.title).toEqual(expectedArticle.title);
    await expect(actualArticle.body).toEqual(expectedArticle.body);
    await expect(actualArticle.tags).toEqual(expectedArticle.tags);
  });

  test("User can see the saved article in the global feed", async ({
    page,
  }) => {
    const mainPage = new MainPage(page);
    const feedPage = new FeedPage(page);

    await expect(mainPage.emptyListMessage).toBeVisible();
    await mainPage.switchToGlobalFeed();

    await expect(feedPage.articlePreview).toBeVisible();
    await expect(feedPage.articleDescription).toBeVisible();
    await expect(feedPage.articleTagList).toBeVisible();
  });
});
