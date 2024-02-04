import mongoose, { Document } from "mongoose";

interface BaseDocument extends Document {
    _id?: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

const BaseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
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

export { BaseModel, BaseDocument, BaseSchema };
