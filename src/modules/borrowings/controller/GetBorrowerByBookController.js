import { BorrowModel } from "../model/BorrowModel";

export const GetBorrowerByBookController = async (book_id) => {
  const borrowModel = new BorrowModel();
  const response = await borrowModel.getCurrentBorrow(book_id);
  return response;
};
