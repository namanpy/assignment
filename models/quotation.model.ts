import { Schema, model } from "mongoose";
import { Product, Quotation } from "@interfaces/product.interface";

const productSchema = new Schema<Product>({
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
});

const schema = new Schema<Quotation>(
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
