import mongoose, { SchemaDefinition, FilterQuery } from "mongoose";
import slugify from "slugify";
import { ICategory, IFilterOptions, IModel } from "../../types";
import { BadRequestError } from "../../errors";

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            unique: [true, "Name must be unique"],
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

        slug: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);
schema.virtual("products", {
    ref: "Product",
    localField: "_id",
    foreignField: "category",
    justOne: false,
});

schema.pre("findOne", async function (next) {
    this.populate("products");
    next();
});

// Pre Save
schema.pre("save", async function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

schema.statics.createRecord = async function (
    data: SchemaDefinition<ICategory>
): Promise<ICategory> {
    try {
        return this.create(data);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

schema.statics.updateRecordById = async function (
    id: string,
    data: Partial<ICategory>
): Promise<ICategory> {
    try {
        const result = await this.findByIdAndUpdate(id, data, { new: true });
        if (!result) {
            throw new BadRequestError("Category not found");
        }
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

schema.statics.deleteRecordById = async function (
    id: string
): Promise<ICategory> {
    try {
        const result = await this.findByIdAndDelete(id);
        if (!result) {
            throw new BadRequestError("Category not found");
        }
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

schema.statics.deleteRecord = async function (
    filter: FilterQuery<ICategory>
): Promise<ICategory> {
    try {
        return this.findOneAndDelete(filter);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

schema.statics.getRecordById = async function (id: string): Promise<ICategory> {
    try {
        const result = await this.findById(id);
        if (!result) {
            throw new BadRequestError("Category not found");
        }
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

schema.statics.getRecords = async function (
    filter: FilterQuery<ICategory>,
    options?: IFilterOptions
): Promise<{ results: ICategory[]; total: number; totalPages: number }> {
    try {
        const { page, limit, sort, order } = options as IFilterOptions;
        const skip = (page - 1) * limit;
        const total = await this.countDocuments(filter);
        const totalPages = Math.ceil(total / limit);
        const results = await this.find(filter)
            .sort({ [sort]: order })
            .skip(skip)
            .limit(limit);
        return {
            results,
            total,
            totalPages,
        };
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

export const Category = mongoose.model<ICategory, IModel<ICategory>>(
    "Category",
    schema
);
