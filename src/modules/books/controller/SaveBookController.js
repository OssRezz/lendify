import { BookModel } from "../model/BookModel";

export const saveBookController = async (data) => {
  try {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("isbn", data.isbn);
    formData.append("publication_year", data.publication_year);
    formData.append("book_status_id", 1);
    formData.append("author_id", data.author_id.value);
    if (data.image_book && data.image_book.length > 0) {
      const file = data.image_book[0];

      if (file instanceof File && file.type.startsWith("image/")) {
        formData.append("image_book", file);
      }
    }

    const bookModel = new BookModel();
    const response = await bookModel.saveBook(formData);

    return {
      success: true,
      title: "Success",
      message: "Book created successfully!",
      data: response.data,
    };
  } catch (error) {
    console.error("Error saving book:", error);

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
