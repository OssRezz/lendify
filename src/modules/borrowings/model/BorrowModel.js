import { ApiClient } from "../../../ApiClient";

export class BorrowModel {
  constructor() {
    this.apiClient = new ApiClient();
  }

  async getBorrowBooks(search = "") {
    const query = search ? `?search=${encodeURIComponent(search)}` : "";
    const response = await this.apiClient.get(
      `v1/borrowings/books/filter${query}`
    );
    return response;
  }

  async borrowBook(user_id, data) {
    const response = await this.apiClient.post(
      `v1/users/${user_id}/borrowings/borrow`,
      data
    );
    return response;
  }

  async returnBook(user_id, data) {
    const response = await this.apiClient.post(
      `v1/users/${user_id}/borrowings/return`,
      data
    );
    return response;
  }
  
  async getCurrentBorrow(book_id) {
    return await this.apiClient.get(
      `v1/borrowings/book/${book_id}/current-borrower`
    );
  }
}
