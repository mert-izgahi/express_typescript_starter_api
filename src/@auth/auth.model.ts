import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { Document } from "mongoose";
import config from "../../config";
import jwt from "jsonwebtoken";
import { TokenPayload } from "./auth.types";

interface AuthDocument extends Document {
    _id?: string;
    name: string;
    email: string;
    password: string;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;

    comparePassword(candidatePassword: string): Promise<boolean>;

    generateAuthToken(): Promise<string>;
}

const AuthSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: [true, "Email must be unique"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        role: {
            type: String,
            enum: {
                values: ["admin", "user"],
                message: "Role must be either 'admin' or 'user'",
            },
            default: "user",
        },
    },
    {
        timestamps: true,
    }
);

// AuthSchema.pre<AuthDocument>("save", async function (next) {
//     if (!this.isModified("password")) {
//         return next();
//     }
//     const saltRounds = config.SALT_ROUNDS as number;

//     const salt = await bcrypt.genSalt(saltRounds);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

AuthSchema.methods.comparePassword = function (candidatePassword: string) {
    const isMatch = bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

AuthSchema.methods.generateAuthToken = async function () {
    const payload: TokenPayload = {
        _id: this._id,
        name: this.name,
        email: this.email,
        role: this.role,
    };
    const token = await jwt.sign(payload, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRE,
    });
    return token;
};

const AuthModel = mongoose.model<AuthDocument>("Auth", AuthSchema);

export { AuthModel, AuthDocument };
