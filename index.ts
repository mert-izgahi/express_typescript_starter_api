import express from "express";
import configs from "./config";
import { initRoutes } from "./src/services/router";
import { connectDB, logger } from "./@starter/@helpers";
import {
    filterApi,
    deserializerUser,
    notFound,
    errorHandler,
} from "./@starter/@middlewares";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(filterApi);
app.use(deserializerUser);
// ENV
const PORT = configs.PORT;
const MONGO_URI = configs.MONGO_URI;

app.listen(PORT, () => {
    connectDB(MONGO_URI);

    initRoutes(app);
    app.use(notFound);
    app.use(errorHandler);
    logger.info("Server started on : http://localhost:" + PORT);
});
