export const APP_CONFIG = {
  ENVIRONMENT: process.env.APP_ENVIRONMENT,
  PORT: 3000,
  MONGO_URL: process.env.MONGO_URL || "",
};

export const BCRYPT_CONFIG = {
  SALT_ROUNDS: 10,
};

export const JWT_CONFIG = {
  SECRET: process.env.JWT_SECRET || "testjwtsecret",
};
