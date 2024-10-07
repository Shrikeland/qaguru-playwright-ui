import { faker } from "@faker-js/faker";

export class ArticleBuilder {
  addTitle() {
    this.title = faker.lorem.sentence();
    return this;
  }

  addDescription() {
    this.description = faker.lorem.sentence();
    return this;
  }

  addBody() {
    this.body = faker.lorem.paragraph();
    return this;
  }

  addTags() {
    this.tags = faker.lorem.word();
    return this;
  }

  generate() {
    const copy = structuredClone({
      title: this.title,
      description: this.description,
      body: this.body,
      tags: this.tags,
    });
    return copy;
  }
}
