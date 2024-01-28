import { Category } from "./model";
import { CategoryRepository } from "./repository";
import { CategoryController } from "./controller";
import createBaseRouter from "../../@base/base.router";

const endPointName: string = "/categories";
const repository = new CategoryRepository(Category);
const controller = new CategoryController(repository);
const router = createBaseRouter(controller, endPointName);

export { router };
