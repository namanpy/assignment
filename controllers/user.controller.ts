import { Response, Request, NextFunction } from "express";
import * as Schema from "@schemas/user.schema";
import * as UserLogicService from "@logic/user.logic";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error, value } = await Schema.REGISTER_USER.validate(req.body);
  if (error) return next(error);

  try {
    const response = await UserLogicService.registerUser(value);
    return res.status(201).json(response);
  } catch (err) {
    return next(err);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error, value } = await Schema.LOGIN_USER.validate(req.body);
  if (error) return next(error);

  try {
    const response = await UserLogicService.loginUser(value);
    return res.status(200).json(response);
  } catch (err) {
    return next(err);
  }
};
