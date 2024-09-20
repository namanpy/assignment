import * as UserDataService from "@data/user.data";

import CustomError from "@classes/error.class";
import ERROR from "@constants/error.constant";
import { generateAuthToken, validatePassword } from "@utils/common.utils";

export const registerUser = async (input: {
  name: string;
  email: string;
  password: string;
}) => {
  const { name, email, password } = input;

  const existingUser = await UserDataService.getUser({ email });

  if (existingUser) throw new CustomError(ERROR.EXISTING_EMAIL);

  const user = await UserDataService.saveUser({
    name,
    email,
    password,
  });

  return {
    userId: user._id,
  };
};

export const loginUser = async (input: { email: string; password: string }) => {
  const { email, password } = input;

  const existingUser = await UserDataService.getUser({ email });

  if (!existingUser) throw new CustomError(ERROR.INVALID_CREDENTIALS);

  const { _id, name, password: originalPassword } = existingUser;

  if (!(await validatePassword(password, originalPassword)))
    throw new CustomError(ERROR.INVALID_CREDENTIALS);

  const authToken = await generateAuthToken({
    _id,
    name,
  });

  return {
    authToken,
  };
};
