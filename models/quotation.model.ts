import { Schema, model } from "mongoose";
import { Product, Quotation } from "@interfaces/quotation.interface";


const productSchema = new Schema<Product>({ 
    name: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    rate : {
        type: Number,
        required: true
    }
});

const schema = new Schema<Quotation>({
    user :{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    products: {
        type: [productSchema],
        required: true,
        minlength: 1
    },
});

export const QuotationModel = model("Quotation", schema, "Quotation")