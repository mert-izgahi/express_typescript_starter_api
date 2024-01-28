import mongoose from "mongoose";

const schema = new mongoose.Schema({
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
});

const User = mongoose.model("User", schema);

export default User;
