import jwt from "jsonwebtoken";
import validator from "validator";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "../../config";
import { BaseDocument, BaseSchema } from "../@base";
import { TokenPayload } from "../@types";

interface IUser extends BaseDocument {
    name: string;
    email: string;
    password: string;
    role: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
    generateTokens({
        session,
    }: {
        session: string;
    }): Promise<{ accessToken: string; refreshToken: string }>;
}
const AccountSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            max: [128, "Name must be less than 128 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: [true, "Email must be unique"],
            validator: {
                validator: (value: string) => {
                    return validator.isEmail(value);
                },
                message: "Invalid email address",
            },
            max: [128, "Email must be less than 128 characters"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            min: [6, "Password must be at least 6 characters"],
            max: [32, "Password must be less than 32 characters"],
        },
        role: {
            type: String,
            enum: {
                values: ["user", "admin"],
                message: `Role must be either 'user' or 'admin'`,
            },
            default: "user",
        },
    },
    {
        timestamps: true,
    }
).add(BaseSchema);

AccountSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const saltRounds = config.SALT_ROUNDS as number;

    const salt = await bcrypt.genSalt(saltRounds as number);

    this.password = await bcrypt.hash(this.password, salt);
    next();
});

AccountSchema.methods.comparePassword = function (
    candidatePassword: string
): Promise<boolean> {
    const isMatch = bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

AccountSchema.methods.generateTokens = async function ({
    session,
}: {
    session: string;
}): Promise<{ accessToken: string; refreshToken: string }> {
    const payload: TokenPayload = {
        _id: this._id,
        name: this.name,
        email: this.email,
        role: this.role,
        session: session,
    };
    const accessToken = await jwt.sign(payload, config.JWT_SECRET, {
        expiresIn: config.ACCESS_TOKEN_EXPIRE_IN,
    });

    const refreshToken = await jwt.sign(payload, config.JWT_SECRET, {
        expiresIn: config.REFRESH_TOKEN_EXPIRE_IN,
    });
    if (!accessToken || !refreshToken) {
        throw new Error("Failed to generate tokens");
    }
    return { accessToken, refreshToken };
};

const User = mongoose.model<IUser>("User", AccountSchema);

export { User, IUser };
