import { UserModel } from "../model/UserModel";

export const GetAllUsersController = async () => {
    const userModel = new UserModel();
    const response = await userModel.getAllUsers();
    return response;
};