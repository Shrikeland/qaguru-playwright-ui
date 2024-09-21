import { BasePage } from "./BasePage";

export class ProfilePage extends BasePage {
  constructor(page) {
    super(page);
    this.articleHeaders = page.locator(".article-preview h1");
    this.favoriteArticleLink = page.getByRole("link", {
      name: "Favorited Articles",
    });
    this.articleList = page.locator("div.article-preview");
    this.favoriteList = page.locator("div.article-preview");
  }

  async getArticleHeaders() {
    return await this.articleHeaders.allInnerTexts();
  }

  async goToFavoriteArticles() {
    await this.favoriteArticleLink.click();
  }

  async getArticleList() {
    return await this.articleList.innerText();
  }

  async getFavoriteList() {
    return await this.favoriteList.innerText();
  }
}
