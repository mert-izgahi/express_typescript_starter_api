import express from "express";
import {
    deserializerUser,
    errorHandler,
    filterApi,
    notFound,
} from "./@middlewares";
import { connectDB, logger } from "./@helpers";
import { sessionsRouter, usersRouter } from ".";

class Server {
    port: number;
    app: express.Application;
    dbUrl: string;
    router: express.Router;
    constructor(port: number, dbUrl: string, router: express.Router) {
        this.port = port;
        this.dbUrl = dbUrl;
        this.router = router;
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(filterApi);
        this.app.use(deserializerUser);
        this.app.use("/api/users", usersRouter);
        this.app.use("/api/sessions", sessionsRouter);
        this.app.use(router);
        connectDB(dbUrl);
        this.app.use(notFound);
        this.app.use(errorHandler);
    }

    start() {
        try {
            this.app.listen(this.port, () => {
                logger.info(`Server running on port ${this.port}`);
            });
        } catch (error) {
            logger.error(error);
        }
    }
}

export default Server;
