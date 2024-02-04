import mongoose from "mongoose";
import { _logger as logger } from "./logger";
export const connectDB = async (connectionString: string) => {
    try {
        const conn = await mongoose.connect(connectionString);
        logger.info(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        logger.error(`Error: ${error}`);
        process.exit(1);
    }
};
