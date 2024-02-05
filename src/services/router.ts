import { Express } from "express";
// import { router as usersRouter } from "../../@starter/users";
// import { router as sessionRouter } from "../../@starter/sessions";
import { router as categoryRouter } from "./categories";
import { router as productRouter } from "./products";
import { usersRouter, sessionsRouter } from "../../@starter";

const initRoutes = (app: Express) => {
    app.use("/api/users", usersRouter);
    app.use("/api/sessions", sessionsRouter);
    app.use("/api/categories", categoryRouter);
    app.use("/api/products", productRouter);
};

export { initRoutes };
