import {
  MainPage,
  RegisterPage,
  SettingsPage,
  EditorPage,
  ArticlePage,
  FeedPage,
} from "./index";

export class App {
  constructor(page) {
    this.page = page;
    this.mainPage = new MainPage(page);
    this.registerPage = new RegisterPage(page);
    this.settingsPage = new SettingsPage(page);
    this.editorPage = new EditorPage(page);
    this.articlePage = new ArticlePage(page);
    this.feedPage = new FeedPage(page);
  }
}
