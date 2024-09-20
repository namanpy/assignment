import { Types } from "mongoose";

export type Product = {
  name: string;
  qty: number;
  rate: number;
};

export type Quotation = {
  user: Types.ObjectId;
  products: Product[];
  total: number;
  gst: number;
};
