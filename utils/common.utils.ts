// Libs
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// Configs
import { BCRYPT_CONFIG, JWT_CONFIG } from "@constants/config.constant";

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, BCRYPT_CONFIG.SALT_ROUNDS);
};

export const validatePassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateAuthToken = async (fields: object) => {
  return jwt.sign(fields, JWT_CONFIG.SECRET);
};

export const decodeAuthToken = async (token: string) => {
  return jwt.verify(token, JWT_CONFIG.SECRET) as any;
};
