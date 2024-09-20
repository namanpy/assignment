import { INVOICE_FORMAT_TYPE } from "@constants/product.constant";
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
  hostUrl: Joi.string().required(),
});

export const GET_INVOICE = Joi.object({
  invoiceId: Joi.string().hex().length(24),
  format: Joi.string()
    .valid(...Object.keys(INVOICE_FORMAT_TYPE))
    .default(INVOICE_FORMAT_TYPE.PDF),
});
