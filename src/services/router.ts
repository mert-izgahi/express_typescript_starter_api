import { Express } from "express";
import { router as usersRouter } from "./users";
import { router as sessionRouter } from "./sessions";
import { router as categoryRouter } from "./categories";
import { router as productRouter } from "./products";
import { authorizedFor } from "../../@starter/@middlewares";

const initRoutes = (app: Express) => {
    app.use("/api/users", usersRouter);
    app.use("/api/sessions", sessionRouter);
    app.use("/api/categories", categoryRouter);
    app.use("/api/products", productRouter);
};

export { initRoutes };
