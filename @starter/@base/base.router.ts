import { Router } from "express";
import { RoleDefinition } from "../@types";
import { BaseController } from "./base.controller";
import { BaseDocument } from "./base.model";
import { asyncWrapper, authorizedFor } from "../@middlewares";

interface BaseRouterOptions {
    middlewares?: any[];
    roles?: RoleDefinition[];
}

const createBaseRouter = <T extends BaseDocument>(
    controller: BaseController<T>,
    options: BaseRouterOptions = {}
): Router => {
    const router = Router();
    if (options.middlewares && options.middlewares.length > 0) {
        router.use(options.middlewares);
    }

    const handleStringRoles = () => {
        const { roles } = options;
        if (!roles) {
            return;
        }

        router.use(authorizedFor(...roles));
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
    const isObjectRole = (role: any): role is RoleDefinition => {
        return typeof role === "object" && "action" in role && "role" in role;
    };
    const handleObjectRoles = () => {
        const roles = options.roles as RoleDefinition[];

        roles.forEach((role) => {
            if (typeof role === "string") {
                return;
            }
            if (!role.action || !role.role) {
                return;
            }

            if (isObjectRole(role)) {
                switch (role.action) {
                    case "createOne":
                        router.post(
                            "/",
                            authorizedFor(role.role),
                            asyncWrapper(controller.createOne.bind(controller))
                        );
                        break;
                    case "getAll":
                        router.get(
                            "/",
                            authorizedFor(role.role),
                            asyncWrapper(controller.getAll.bind(controller))
                        );
                        break;

                    case "getOneById":
                        router.get(
                            `/:id`,
                            authorizedFor(role.role),
                            asyncWrapper(controller.getOneById.bind(controller))
                        );
                        break;
                    case "updateOne":
                        router.put(
                            `/:id`,
                            authorizedFor(role.role),
                            asyncWrapper(controller.updateOne.bind(controller))
                        );
                        break;
                    case "deleteOne":
                        router.delete(
                            `/:id`,
                            authorizedFor(role.role),
                            asyncWrapper(controller.deleteOne.bind(controller))
                        );
                        break;
                    default:
                        break;
                }
            }
        });
    };
    const isObjectRoles = (roles: any): roles is RoleDefinition[] => {
        return Array.isArray(roles) && roles.every(isObjectRole);
    };

    if (isObjectRoles(options.roles)) {
        handleObjectRoles();
    } else {
        handleStringRoles();
    }
    return router;
};

export { createBaseRouter };
