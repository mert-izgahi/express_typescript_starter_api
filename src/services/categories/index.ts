import { BaseController, BaseRepository, createBaseRouter } from "@starter";
import { Category, ICategory } from "./model";

const repository = new BaseRepository<ICategory>(Category);
const controller = new BaseController<ICategory>(repository);
const router = createBaseRouter(controller, {
    prefix: "/categories",
    roles: ["admin", "user"],
});

export { router };
