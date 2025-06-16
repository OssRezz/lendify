import { ApiClient } from "../../../ApiClient";

export class BookStatusModel {
  constructor() {
    this.apiClient = new ApiClient();
  }

  async getBookStatuses() {
    const response = await this.apiClient.get("v1/book-statuses");
    return response;
  }
}
