import { Router } from "express";
import { RoleDefinition } from "../@types";
import { BaseController } from "./base.controller";
import { BaseDocument } from "./base.model";
import { authorizedFor } from "../@middlewares/authorized-for";
import { asyncWrapper } from "../@middlewares";

interface BaseRouterOptions {
    middlewares?: any[];
    prefix?: string;
    roles?: RoleDefinition[];
}

const createBaseRouter = <T extends BaseDocument>(
    controller: BaseController<T>,
    options: BaseRouterOptions
): Router => {
    const router = Router();
    const { middlewares = [], prefix = "", roles = [] } = options;

    if (middlewares && middlewares.length > 0) {
        router.use(middlewares);
    }

    const handleStringRoles = () => {
        router.use(authorizedFor(roles));

        router
            .route(prefix)
            .get(asyncWrapper(controller.getAll.bind(controller)))
            .post(asyncWrapper(controller.createOne.bind(controller)));

        router
            .route(`${prefix}/:id`)
            .get(asyncWrapper(controller.getOneById.bind(controller)))
            .put(asyncWrapper(controller.updateOne.bind(controller)))
            .delete(asyncWrapper(controller.deleteOne.bind(controller)));
    };

    if (roles && roles.length > 0) {
        handleStringRoles();
    }
    return router;
};

export { createBaseRouter };
