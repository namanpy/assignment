import { Types, Schema, model } from "mongoose";
import { Product, Quotation } from "@interfaces/product.interface";

export type QuotationDocument = Quotation & {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

const productSchema = new Schema<Product>(
  {
    name: {
      type: String,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const schema = new Schema<QuotationDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    products: {
      type: [productSchema],
      required: true,
      minlength: 1,
    },
    total: {
      type: Number,
      required: true,
    },
    gst: {
      type: Number,
      default: 18,
    },
  },
  { timestamps: true }
);

export const QuotationModel = model("Quotation", schema, "Quotation");
