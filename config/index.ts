import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

export default {
    PORT: process.env.PORT,
    MONGO_URI:
        process.env.MONGO_URI ||
        "mongodb://localhost:27017/express-typescript-starter-db",
    JWT_SECRET: process.env.JWT_SECRET || "secret",
    JWT_EXPIRE: process.env.JWT_EXPIRE || "7d",
    SALT_ROUNDS: Number(process.env.SALT_ROUNDS) || 10,
};
