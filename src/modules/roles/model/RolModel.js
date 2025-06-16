import { ApiClient } from "../../../ApiClient";

export class RolModel {
  constructor() {
    this.apiClient = new ApiClient();
  }

  async getRoles() {
    const response = await this.apiClient.get(`v1/roles`);
    return response;
  }
}
