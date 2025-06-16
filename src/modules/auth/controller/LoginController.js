import { AuthModel } from "../model/AuthModel";

export const LoginController = async ({ email, password }) => {
  try {
    if (!email || !password) {
      return {
        success: false,
        title: "Validation Errors",
        message: "Email and password are required.",
      };
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const response = await new AuthModel().login(formData);

    const { id, name, token, role, permissions } = response.data;
    return {
      success: true,
      user: {
        id,
        name,
        email,
        token,
        role,
        permissions,
      },
    };
  } catch (error) {

    console.error(error);
    const code = error?.code || 500;
    const title = error?.message || "Login Error";

    if (code === 422 && error.errors) {
      const messageList = Object.values(error.errors).flat();
      return {
        success: false,
        title,
        message: messageList.length > 0 ? messageList : "Invalid credentials.",
      };
    }

    if (typeof error.data === "string") {
      return {
        success: false,
        title,
        message: error.data,
      };
    }

    return {
      success: false,
      title,
      message: "Something went wrong. Please try again later.",
    };
  }
};