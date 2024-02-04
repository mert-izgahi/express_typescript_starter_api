import { Express } from "express";
import { router as usersRouter } from "./users";
import { router as sessionRouter } from "./sessions";
import { router as categoryRouter } from "./categories";
import { router as productRouter } from "./products";
import { authorizedFor } from "../../@starter/@middlewares";

const initRoutes = (app: Express) => {
    app.use("/api/users", authorizedFor("admin"), usersRouter);
    app.use("/api/sessions", authorizedFor("admin", "user"), sessionRouter);
    app.use(
        "/api/categories",
        authorizedFor("user", "admin", "*"),
        categoryRouter
    );
    app.use("/api/products", authorizedFor("admin"), productRouter);
};

export { initRoutes };
