import { faker } from "@faker-js/faker";

export class UserBuilder {
  addBio() {
    this.bio = faker.music.genre();
    return this;
  }

  addEmail() {
    this.email = faker.internet.email();
    return this;
  }

  addName() {
    this.name = faker.person.firstName("female");
    return this;
  }

  addPassword() {
    this.password = faker.internet.password();
    return this;
  }

  generate() {
    const copy = structuredClone({
      bio: this.bio,
      email: this.email,
      name: this.name,
      password: this.password,
    });
    return copy;
  }
}
