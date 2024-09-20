import { Types } from "mongoose";

import * as QuotationDataService from "@data/quotation.data";
import * as InvoiceDataService from "@data/invoice.data";
import * as PuppeteerDataService from "@data/puppeteer.data";

import { Product } from "@interfaces/product.interface";
import CustomError from "@classes/error.class";
import ERROR from "@constants/error.constant";
import { generateInvoiceHtml } from "@utils/product.utils";
import { INVOICE_FORMAT_TYPE } from "@constants/product.constant";

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
export const getQuotations = async (input: {
  userId: Types.ObjectId;
  hostUrl: string;
}) => {
  const { userId, hostUrl } = input;

  const quotations = await QuotationDataService.getQuotationByUser({
    userId,
  }).then(async (quotations) => {
    return await Promise.all(
      quotations.map(async (quotation) => {
        const { user, _id: quotationId, products, createdAt } = quotation;

        // Generates Invoice that expires after 1 day
        const invoice = await InvoiceDataService.generateInvoice({
          quotationId,
          data: generateInvoiceHtml(quotation),
        });

        return {
          quotationId,
          products,
          invoicePdfUrl: `${hostUrl}/api/v1/product/invoice/?invoiceId=${invoice._id.toString()}&format=${
            INVOICE_FORMAT_TYPE.PDF
          }`,
          invoiceImageUrl: `${hostUrl}/api/v1/product/invoice/?invoiceId=${invoice._id.toString()}&format=${
            INVOICE_FORMAT_TYPE.IMAGE
          }`,
          createdAt,
        };
      })
    );
  });

  return quotations;
};

export const getInvoice = async (input: {
  invoiceId: Types.ObjectId;
  format: string;
}) => {
  const { invoiceId, format } = input;

  const invoice = await InvoiceDataService.getInvoice({
    invoiceId,
  });

  if (!invoice) throw new CustomError(ERROR.INVOICE_EXPIRED_OR_NOT_FOUND);

  switch (format) {
    case INVOICE_FORMAT_TYPE.PDF:
      return await PuppeteerDataService.generatePdfFromHtml(invoice.data);
    case INVOICE_FORMAT_TYPE.IMAGE:
      return await PuppeteerDataService.generateImageFromHtml(invoice.data);
  }
};
