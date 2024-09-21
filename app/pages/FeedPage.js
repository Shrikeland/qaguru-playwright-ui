import { BasePage } from "./BasePage";

export class FeedPage extends BasePage {
  constructor(page) {
    super(page);
    this.articlePreview = page.locator("div:nth-child(2) > a h1");
    this.articleDescription = page.locator("div:nth-child(2) > a p");
    this.articleTagList = page.locator("div:nth-child(2) > a ul");
  }
}
