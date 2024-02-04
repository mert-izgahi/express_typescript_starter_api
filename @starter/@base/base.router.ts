import { Router } from "express";
import { RoleDefinition } from "../@types";
import { BaseController } from "./base.controller";
import { BaseDocument } from "./base.model";
import { asyncWrapper } from "../@middlewares";

interface BaseRouterOptions {
    middlewares?: any[];
    prefix?: string;
    roles?: RoleDefinition[];
}

const createBaseRouter = <T extends BaseDocument>(
    controller: BaseController<T>
): Router => {
    const router = Router();
    const handleStringRoles = () => {
        router
            .route("/")
            .get(asyncWrapper(controller.getAll.bind(controller)))
            .post(asyncWrapper(controller.createOne.bind(controller)));

        router
            .route(`/:id`)
            .get(asyncWrapper(controller.getOneById.bind(controller)))
            .put(asyncWrapper(controller.updateOne.bind(controller)))
            .delete(asyncWrapper(controller.deleteOne.bind(controller)));
    };

    handleStringRoles();
    return router;
};

export { createBaseRouter };
