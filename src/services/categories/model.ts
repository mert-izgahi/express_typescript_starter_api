import mongoose, { Schema } from "mongoose";
import { BaseDocument, BaseSchema } from "../../@base";

interface ICategory extends BaseDocument {
    name: string;
    description: string;
}

const categorySchema = new Schema<ICategory>({
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
}).add(BaseSchema);

const Category = mongoose.model<ICategory>("Category", categorySchema);
export { Category, ICategory };
