import { UserModel } from "../model/UserModel";

export const GetUsersController = async (page) => {
  const userModel = new UserModel();
  const response = await userModel.getUsers(page);
  return response.data;
};
