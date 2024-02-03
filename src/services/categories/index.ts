import { BaseController, BaseRepository } from "../../@base";
import createBaseRouter from "../../@base/base.router";
import { Category, ICategory } from "./model";

const repository = new BaseRepository<ICategory>(Category);
const controller = new BaseController<ICategory>(repository);
const router = createBaseRouter(controller, {
    prefix: "/categories",
    roles: ["admin", "user"],
});

export { router };
