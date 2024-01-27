import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

export default {
    PORT: process.env.PORT,
    MONGO_URI:
        process.env.MONGO_URI ||
        "mongodb://localhost:27017/express-typescript-starter-db",
};
