import { ApiClient } from "../../../ApiClient";

export class BookModel {
  constructor() {
    this.apiClient = new ApiClient();
  }

  async getBooks(page) {
    const response = await this.apiClient.get(`v1/books?page=${page}`);
    return response;
  }

  async getBook(id) {
    const response = await this.apiClient.get(`v1/books/${id}`);
    return response;
  }

  async saveBook(book) {
    const response = await this.apiClient.post(`v1/books`, book, {
      "Content-Type": "multipart/form-data",
    });
    return response;
  }

  async updateBook(data, id) {
    const response = await this.apiClient.post(
      `v1/books/${id}?_method=PUT`,
      data,
      {
        "Content-Type": "multipart/form-data",
      }
    );
    return response;
  }
}
