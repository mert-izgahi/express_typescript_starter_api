import mongoose, { Schema } from "mongoose";
import { BaseDocument, BaseSchema } from "../../@base";

interface IProduct extends BaseDocument {
    name: string;
    description: string;
    price: number;
    image?: string;
    color: string;
    size: string;
    category: string;
}

const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: [true, "Name is required"],
        enum: {
            values: ["Table", "Chair", "Sofa"],
            message: "Name must be either 'Table', 'Chair' or 'Sofa'",
        },
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        max: [100, "Description must be less than 100 characters"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    image: {
        type: String,
        default: null,
    },
    color: {
        type: String,
        required: [true, "Color is required"],
    },
    size: {
        type: String,
        required: [true, "Size is required"],
    },
    category: {
        type: String,
        required: [true, "Category is required"],
    },
}).add(BaseSchema);

const Product = mongoose.model<IProduct>("Product", productSchema);
export { Product, IProduct };
