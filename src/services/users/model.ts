import mongoose from "mongoose";
import { AuthModel, AuthDocument } from "../../@auth";

interface IUserModel extends Document, AuthDocument {
    bio: string;
    image: string;
}

const schema = new mongoose.Schema({
    bio: {
        type: String,
        default: null,
        max: [100, "Bio must be less than 100 characters"],
    },

    image: {
        type: String,
        default: null,
    },
});

const User = AuthModel.discriminator<IUserModel>("User", schema);

export { User, IUserModel };
