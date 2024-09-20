import { Types } from "mongoose";

import * as QuotationDataService from "@data/quotation.data";
import * as PuppeteerDataService from "@data/puppeteer.data";

import { Product } from "@interfaces/product.interface";
import CustomError from "@classes/error.class";
import ERROR from "@constants/error.constant";
import { generateInvoiceHtml } from "@utils/product.utils";

// Add a product
export const addProducts = async (input: {
  userId: Types.ObjectId;
  products: Product[];
}) => {
  const { userId, products } = input;

  const quotation = await QuotationDataService.saveQuotation({
    userId,
    products,
    total: products.reduce((p, v) => p + v.qty * v.rate, 0),
    gst: 18,
  });

  const invoiceHtml = generateInvoiceHtml(quotation);

  return await PuppeteerDataService.generatePdfFromHtml(invoiceHtml);
};

// Get all quotation
export const getQuotations = async (input: { userId: Types.ObjectId }) => {
  const { userId } = input;

  const quotations = await QuotationDataService.getQuotationByUser({ userId });

  return {
    quotations: quotations.map(({ user, _id, ...otherData }) => ({
      quotationId: _id,
      ...otherData,
    })),
  };
};

export const generateInvoice = async (input: {
  userId: Types.ObjectId;
  quotationId: Types.ObjectId;
}) => {
  const { userId, quotationId } = input;

  const quotation = await QuotationDataService.getQuotation({
    userId,
    quotationId,
  });

  if (!quotation) throw new CustomError(ERROR.RESOURCE_NOT_FOUND);

  const invoiceHtml = generateInvoiceHtml(quotation);

  return await PuppeteerDataService.generatePdfFromHtml(invoiceHtml);
};
