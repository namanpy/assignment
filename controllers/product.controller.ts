import { Response, Request, NextFunction } from "express";
import * as Schema from "@schemas/product.schema";
import * as ProductLogicService from "@logic/product.logic";
import { INVOICE_FORMAT_TYPE } from "@constants/product.constant";

export const addProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error, value } = await Schema.ADD_PRODUCTS.validate({
    userId: req.user?._id?.toString(),
    ...req.body,
  });
  if (error) return next(error);

  try {
    const response = await ProductLogicService.addProducts(value);
    return res.status(201).contentType("application/pdf").send(response);
  } catch (err) {
    return next(err);
  }
};

export const getQuotations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error, value } = await Schema.GET_QUOTATIONS.validate({
    userId: req.user?._id?.toString(),
    hostUrl: `${req.protocol}://${req.get("host")}`,
  });
  if (error) return next(error);

  try {
    const response = await ProductLogicService.getQuotations(value);
    return res.status(201).json(response);
  } catch (err) {
    return next(err);
  }
};

export const getInvoice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error, value } = await Schema.GET_INVOICE.validate(req.query);
  if (error) return next(error);

  try {
    const response = await ProductLogicService.getInvoice(value);

    return res
      .status(201)
      .contentType(
        req.query.format === INVOICE_FORMAT_TYPE.PDF
          ? "application/pdf"
          : "image/png"
      )
      .send(response);
  } catch (err) {
    return next(err);
  }
};
