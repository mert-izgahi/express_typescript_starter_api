import { BaseController } from "./base.controller";
import express from "express";

const createBaseRouter = (
    controller: BaseController<any>,
    route: string,
    middlewares: any[] = []
): express.Router => {
    const router = express.Router();
    if (middlewares.length > 0) {
        router.use(middlewares);
    }
    router
        .route(route)
        .get(controller.getAll.bind(controller))
        .post(controller.createOne.bind(controller));
    router
        .route(`${route}/:id`)
        .get(controller.getOneById.bind(controller))
        .put(controller.updateOne.bind(controller))
        .delete(controller.deleteOne.bind(controller));
    return router;
};

export default createBaseRouter;
