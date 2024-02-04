import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

export default {
    PORT: process.env.PORT,
    MONGO_URI:
        process.env.MONGO_URI ||
        "mongodb://localhost:27017/express-typescript-starter-db",
    JWT_SECRET: process.env.JWT_SECRET || "secret",
    ACCESS_TOKEN_EXPIRE_IN: process.env.ACCESS_TOKEN_EXPIRE_IN || "7d",
    REFRESH_TOKEN_EXPIRE_IN: process.env.REFRESH_TOKEN_EXPIRE_IN || "30d",
    SALT_ROUNDS: Number(process.env.SALT_ROUNDS) || 10,
};
