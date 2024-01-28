import express from "express";
import configs from "./config";
import { logger, connectDB } from "./src/helpers";
import { notFound, errorHandler, filterApi } from "./src/middlewares";
import { router } from "./src/services/router";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ENV
const PORT = configs.PORT;
const MONGO_URI = configs.MONGO_URI;

app.listen(PORT, () => {
    connectDB(MONGO_URI);
    app.use(filterApi);
    app.use(router);
    app.use(notFound);
    app.use(errorHandler);
    logger.info("Server started on : http://localhost:" + PORT);
});