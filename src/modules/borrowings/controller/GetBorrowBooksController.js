import { BorrowModel } from "../model/BorrowModel";

export const GetBorrowBooksController = async (search = "") => {
  const borrowModel = new BorrowModel();
  const response = await borrowModel.getBorrowBooks(search);
  return response.data;
};
