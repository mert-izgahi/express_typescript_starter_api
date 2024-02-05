import express, { Application, Router } from "express";
import {
    deserializerUser,
    errorHandler,
    filterApi,
    notFound,
} from "./@middlewares";
import { logger } from "./@helpers";
import { sessionsRouter, usersRouter } from ".";
import http from "http";
import mongoose from "mongoose";
class Server {
    port: number;
    app: Application;
    router: Router;
    server: http.Server | null = null;
    connectionInstance: typeof mongoose | null = null;
    constructor(port: number, router: express.Router) {
        this.port = port;
        this.router = router;
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(filterApi);
        this.app.use(deserializerUser);
        this.app.use("/api/users", usersRouter);
        this.app.use("/api/sessions", sessionsRouter);
        this.app.use(router);
        this.app.use(notFound);
        this.app.use(errorHandler);
    }
    connectDb = async (connectionString: string) => {
        try {
            this.connectionInstance = await mongoose.connect(connectionString);
            logger.info(
                `MongoDB Connected: ${this.connectionInstance.connection.host}`
            );
        } catch (error) {
            logger.error(`Error: ${error}`);
            process.exit(1);
        }
    };

    disconnectDb = async () => {
        try {
            if (this.connectionInstance) {
                await this.connectionInstance.disconnect();
                logger.info("MongoDB Disconnected");
            }
        } catch (error) {
            logger.error(`Error: ${error}`);
            process.exit(1);
        }
    };
    start() {
        try {
            this.server = this.app.listen(this.port, () => {
                logger.info(`Server running on port ${this.port}`);
            });

            this.server.on("error", (error) => {
                logger.error(error);
            });
        } catch (error) {
            logger.error(error);
        }
    }

    close() {
        if (this.server) {
            this.server.close(() => {
                logger.info("Server closed");
            });
        }
    }
}

export default Server;
