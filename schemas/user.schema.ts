import Joi from "joi";

export const REGISTER_USER = Joi.object({
  name: Joi.string().max(32).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const LOGIN_USER = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
