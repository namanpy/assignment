import { Quotation } from "@interfaces/product.interface";
import { QuotationModel } from "@models/quotation.model";
import { Types } from "mongoose";

export const getQuotation = async (input: {
  quotationId: Types.ObjectId;
  userId: Types.ObjectId;
}) => {
  const { userId, quotationId } = input;

  const quotation = await QuotationModel.findOne({
    _id: quotationId,
    user: userId,
  })
    .lean()
    .exec();
  return quotation;
};

export const getQuotationByUser = async (input: { userId: Types.ObjectId }) => {
  const { userId } = input;

  const quotation = await QuotationModel.find({ user: userId }).lean().exec();
  return quotation;
};

export const saveQuotation = async (
  input: { userId: Types.ObjectId } & Omit<Quotation, "user">
) => {
  const { userId, ...quoteData } = input;

  const quotation = new QuotationModel({
    user: userId,
    ...quoteData,
  });
  await quotation.save();
  return quotation.toObject({});
};
