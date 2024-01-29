import { BaseController, BaseRepository } from "../../@base";
import createBaseRouter from "../../@base/base.router";
import { Category, ICategory } from "./model";

const endPointName: string = "/categories";
const repository = new BaseRepository<ICategory>(Category);
const controller = new BaseController<ICategory>(repository);
const router = createBaseRouter(controller, endPointName);

export { router };
