import User from "./user.model";
import { IUser } from "./user.interface";

const createUser = async (data: IUser) => {
  return await User.create(data);
};

export const UserServices = {
  createUser,
};
