import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    quotation: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Quotation",
    },
    data: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      expires: 86400,
    },
  },
  { timestamps: true }
);

export const InvoiceModel = model("Invoice", schema, "Invoice");
