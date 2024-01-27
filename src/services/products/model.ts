import mongoose, { FilterQuery } from "mongoose";
import slugify from "slugify";
import { IModel, IProduct } from "../../types";
import { NotFoundError } from "../../errors";
const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            unique: [true, "Name must be unique"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            max: [100, "Description must be less than 100 characters"],
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Price must be greater than 0"],
        },

        image: {
            type: String,
            default: "no-image.png",
        },
        color: {
            type: String,
            enum: {
                values: ["red", "green", "blue"],
                message: "Color must be either 'red', 'green' or 'blue'",
            },
        },
        size: {
            type: String,
            enum: {
                values: ["small", "medium", "large"],
                message: "Size must be either 'small', 'medium' or 'large'",
            },
        },
        slug: {
            type: String,
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "Category is required"],
        },
    },
    {
        timestamps: true,
    }
);

// Pre Save
schema.pre("save", async function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

schema.statics.createRecord = async function (data: IProduct) {
    try {
        return this.create(data);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

schema.statics.getRecordBySlug = async function (slug: string) {
    try {
        return this.findOne({ slug });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

schema.statics.getRecordById = async function (id: string) {
    try {
        const product = await this.findById(id);
        if (!product) throw new NotFoundError("Product not found");
        return product;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

schema.statics.getRecords = async function (
    filter: FilterQuery<IProduct>,
    options: { page: number; limit: number; sort: string; order: string }
) {
    const { page, limit, sort, order } = options;
    const skip = (page - 1) * limit;

    try {
        return this.find(filter)
            .sort({ [sort]: order })
            .skip(skip)
            .limit(limit);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

schema.statics.updateRecordById = async function (
    id: string,
    data: Partial<IProduct>
) {
    try {
        return this.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

schema.statics.deleteRecordById = async function (id: string) {
    try {
        return this.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Virtuals
schema.set("toJSON", {
    virtuals: true,
    versionKey: false,
});

schema.set("toObject", {
    virtuals: true,
    versionKey: false,
});

const Product = mongoose.model<IProduct, IModel<IProduct>>("Product", schema);

export default Product;
