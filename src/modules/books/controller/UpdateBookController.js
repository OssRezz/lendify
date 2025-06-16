import { BookModel } from "../model/BookModel";

export const updateBookController = async (data, book_id) => {
    console.log(data);
    console.log(book_id);
  try {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("isbn", data.isbn);
    formData.append("publication_year", data.publication_year);
    formData.append("book_status_id", 1); // puedes hacerlo dinámico si es necesario
    formData.append("author_id", data.author_id.value);

    // Verificar si se cargó una nueva imagen
    if (data.image_book && data.image_book.length > 0) {
      const file = data.image_book[0];

      if (file instanceof File && file.type.startsWith("image/")) {
        formData.append("image_book", file);
      }
    }

    const bookModel = new BookModel();
    const response = await bookModel.updateBook(formData, book_id);

    return {
      success: true,
      title: "Success",
      message: "Book updated successfully!",
      data: response.data,
    };
  } catch (error) {
    console.error("Error updating book:", error);

    const code = error?.code || 500;
    const title = error?.message || "Error updating book";

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