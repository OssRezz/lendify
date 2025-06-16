import { ApiClient } from "../../../ApiClient";

export class AuthModel {
  constructor() {
    this.apiClient = new ApiClient();
  }

  async login(credentials) {
    const response = await this.apiClient.post(
      "v1/login",
      credentials,
      {},
      false
    );
    return response;
  }
}
