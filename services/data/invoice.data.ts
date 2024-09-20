import { InvoiceModel } from "@models/invoice.model";
import { Types } from "mongoose";

export const getInvoice = async (input: { invoiceId: Types.ObjectId }) => {
  const { invoiceId } = input;

  const invoice = await InvoiceModel.findOne({
    _id: invoiceId,
  })
    .lean()
    .exec();
  return invoice;
};

export const generateInvoice = async (input: {
  quotationId: Types.ObjectId;
  data: string;
}) => {
  const { quotationId, data } = input;

  const invoice = new InvoiceModel({
    quotation: quotationId,
    data,
  });
  await invoice.save();
  return invoice.toObject({});
};
