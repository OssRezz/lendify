import { ApiClient } from "../../../ApiClient";

export class UserModel {
  constructor() {
    this.apiClient = new ApiClient();
  }

  async getUsers(page) {
    const response = await this.apiClient.get(`v1/users?page=${page}`);
    return response;
  }

  async getAllUsers() {
    const response = await this.apiClient.get(`v1/users-all`);
    return response;
  }

  async saveUser(data) {
    const response = await this.apiClient.post(`v1/users`, data);
    return response;
  }

  async updateUser(id, data) {
    const response = await this.apiClient.post(
      `v1/users/${id}?_method=PUT`,
      data
    );
    return response;
  }
}
