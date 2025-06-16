import { BookStatusModel } from "../model/BookStatusModel";

export const getBookStatusesController = async () => {
  const bookStatusModel = new BookStatusModel();
  const response = await bookStatusModel.getBookStatuses();
  return response.data;
};
