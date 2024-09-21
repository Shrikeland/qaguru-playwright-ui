import { BasePage } from "./BasePage";

export class EditorPage extends BasePage {
  constructor(page) {
    super(page);
    this.articleTitleInput = page.locator('input[name="title"]');
    this.articleDescriptionInput = page.locator('input[name="description"]');
    this.articleTextarea = page.locator(
      'textarea[placeholder^="Write your article"]'
    );
    this.articleTagsInput = page.locator('input[placeholder="Enter tags"]');
    this.publishArticleButton = page.locator('button[type="submit"]');
    this.updateButton = page.getByRole("button", "Update Settings");
  }

  async publishNewArticle(article) {
    await this.articleTitleInput.fill(article.title);
    await this.articleDescriptionInput.fill(article.description);
    await this.articleTextarea.fill(article.body);
    await this.articleTagsInput.fill(article.tags);
    await this.publishArticleButton.click();
  }
}
