import { Schema } from "mongoose";
import { BaseModel, BaseDocument } from "../../@base";

export interface ICategory extends BaseDocument {
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
});

const Category = BaseModel.discriminator<ICategory>("Category", categorySchema);
export default Category;
