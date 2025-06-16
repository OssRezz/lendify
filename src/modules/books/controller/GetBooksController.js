import { BookModel } from "../model/BookModel";

export const GetBooksController = async (page) => {
  const bookModel = new BookModel();
  const response = await bookModel.getBooks(page);
  return response.data;
};
