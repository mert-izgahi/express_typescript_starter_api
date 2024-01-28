import mongoose, { Document } from "mongoose";
import slugify from "slugify";
export interface BaseDocument extends Document {
    _id?: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    slug?: string;
    deletedAt?: Date;
}

const BaseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        slug: {
            type: String,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

BaseSchema.pre<BaseDocument>("save", function (next) {
    if (!this.isNew) {
        this.updatedAt = new Date();
    }

    if (!this.slug) {
        this.slug = slugify(this.name, { lower: true });
    }
    next();
});

BaseSchema.set("toJSON", {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
    },
});

BaseSchema.set("toObject", {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
    },
});

const BaseModel = mongoose.model<BaseDocument>("Base", BaseSchema);

export default BaseModel;
