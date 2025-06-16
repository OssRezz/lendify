import { AuthorModel } from "../model/AuthorModel";

export const getAuthorsController = async () => {
  const authorModel = new AuthorModel();
  const response = await authorModel.getAuthors();
  return response.data;
};
