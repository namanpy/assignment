import { UserModel } from "@models/user.model";

export const getUser = async (input: { name?: string; email?: string }) => {
  const user = await UserModel.findOne(input).lean().exec();
  return user;
};

export const saveUser = async (input: {
  name: string;
  email: string;
  password: string;
}) => {
  const user = new UserModel(input);
  await user.save();
  return user.toObject({});
};
