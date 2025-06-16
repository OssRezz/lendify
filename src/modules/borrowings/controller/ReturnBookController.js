import { BorrowModel } from "../model/BorrowModel";

export const ReturnBookController = async (data) => {
  try {
    const borrowModel = new BorrowModel();
    const formData = new FormData();
    formData.append("book_ids[]", data.book_ids);
    const response = await borrowModel.returnBook(data.user_id, formData);
    response;
    return {
      success: true,
      title: "Success",
      message: "Book returned successfully!",
      data: response.data,
    };
  } catch (error) {
    console.error("Error returning book:", error);

    const code = error?.code || 500;
    const title = error?.message || "Error creating book";

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
