import mongoose from "mongoose";
import config from "../../config";
const JWT_EXPIRE = Number(config.ACCESS_TOKEN_EXPIRE_IN.slice(0, -1));
console.log(JWT_EXPIRE);

export interface ISession extends Document {
    _id?: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    valid: boolean;
    agent: string;
    expires: Date;
    createdAt: Date;
    updatedAt: Date;
}

const SessionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        agent: {
            type: String,
            required: true,
        },
        valid: {
            type: Boolean,
            default: true,
        },
        expires: {
            type: Date,
            required: true,
            default: Date.now() + JWT_EXPIRE * 1000 * 60 * 60 * 24, // 1 day * jwt expire time
        },
    },
    {
        timestamps: true,
    }
);

const Session = mongoose.model<ISession>("Session", SessionSchema);

export { Session };
