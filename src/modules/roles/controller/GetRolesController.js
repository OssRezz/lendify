import { RolModel } from "../model/RolModel";

export const getRolesController = async () => {
  const rolModel = new RolModel();
  const response = await rolModel.getRoles();
  return response.data;
};
