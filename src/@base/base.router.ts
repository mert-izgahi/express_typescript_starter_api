import { asyncWrapper } from "../@middlewares";
import { authorizedFor } from "../@middlewares/authorized-for";
import { BaseController } from "./base.controller";
import express from "express";
import { IRoles } from "./base.types";

const createBaseRouter = (
    controller: BaseController<any>,
    options: {
        middlewares?: any[];
        prefix?: string;
        roles?: string[];
    }
): express.Router => {
    const router = express.Router();
    const { middlewares = [], prefix = "", roles = [] } = options!;
    if (middlewares && middlewares.length > 0) {
        router.use(middlewares);
    }

    if (roles.length > 0) {
        if (Array.isArray(roles)) {
            if (roles.length === 1) {
                router.use(authorizedFor(roles[0] as string));
            } else {
                router.use(authorizedFor(...(roles as string[])));
            }
            router
                .route(prefix)
                .get(asyncWrapper(controller.getAll.bind(controller)))
                .post(asyncWrapper(controller.createOne.bind(controller)));
            router
                .route(`${prefix}/:id`)
                .get(asyncWrapper(controller.getOneById.bind(controller)))
                .put(asyncWrapper(controller.updateOne.bind(controller)))
                .delete(asyncWrapper(controller.deleteOne.bind(controller)));
        } else {
            const { action, role } = roles;
            switch (action) {
                case "createOne":
                    router.post(
                        ``,
                        authorizedFor(role),
                        asyncWrapper(controller.createOne.bind(controller))
                    );
                    break;
                case "getAll":
                    router.get(
                        ``,
                        authorizedFor(role),
                        asyncWrapper(controller.getAll.bind(controller))
                    );
                    break;
                case "getOneById":
                    router.get(
                        `/:id`,
                        authorizedFor(role),
                        asyncWrapper(controller.getOneById.bind(controller))
                    );
                    break;
                case "updateOne":
                    router.put(
                        `/:id`,
                        authorizedFor(role),
                        asyncWrapper(controller.updateOne.bind(controller))
                    );
                    break;
                case "deleteOne":
                    router.delete(
                        `/:id`,
                        authorizedFor(role),
                        asyncWrapper(controller.deleteOne.bind(controller))
                    );
                    break;
                default:
                    break;
            }

            // router
            //     .route(``)
            //     .get(asyncWrapper(controller.getAll.bind(controller)))
            //     .post(asyncWrapper(controller.createOne.bind(controller)));
            // router
            //     .route(`/:id`)
            //     .get(asyncWrapper(controller.getOneById.bind(controller)))
            //     .put(asyncWrapper(controller.updateOne.bind(controller)))
            //     .delete(asyncWrapper(controller.deleteOne.bind(controller)));
        }
    }

    return router;
};

export default createBaseRouter;
