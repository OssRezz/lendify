import { ApiClient } from "../../../ApiClient";

export class AuthorModel {
  constructor() {
    this.apiClient = new ApiClient();
  }

  async getAuthors() {
    const response = await this.apiClient.get("v1/authors");
    return response;
  }
}
