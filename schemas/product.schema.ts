import Joi from "joi";

export const ADD_PRODUCTS = Joi.object({
  userId: Joi.string().hex().length(24),
  products: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        qty: Joi.number().integer().min(1).required(),
        rate: Joi.number().min(0).required(),
      })
    )
    .min(1)
    .required(),
});

export const GET_QUOTATIONS = Joi.object({
  userId: Joi.string().hex().length(24),
});

export const GENERATE_INVOICE = Joi.object({
  userId: Joi.string().hex().length(24),
  quotationId: Joi.string().hex().length(24),
});
