import { UserModel } from "../model/UserModel";

export const saveUserController = async (data) => {
  try {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("library_id", data.library_id);
    formData.append("name", data.name);
    formData.append("password", data.password);
    formData.append("role", data.role);

    const userModel = new UserModel();

    const response = await userModel.saveUser(formData);

    return {
      success: true,
      title: "Success",
      message: "User created successfully!",
      data: response.data,
    };
  } catch (error) {
    console.error("Error saving user:", error);

    const code = error?.code || 500;
    const title = error?.message || "Error creating user";

    if (code === 422 && error.errors) {
      const messageList = Object.values(error.errors).flat();
      return {
        success: false,
        title,
        message: messageList.length > 0 ? messageList : "Validation error.",
      };
    }

    return {
      success: false,
      title,
      message: "Something went wrong. Please try again later.",
    };
  }
};
