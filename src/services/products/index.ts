import { BaseController, BaseRepository } from "../../@base";
import createBaseRouter from "../../@base/base.router";
import { Product, IProduct } from "./model";

const repository = new BaseRepository<IProduct>(Product);
const controller = new BaseController<IProduct>(repository);
const router = createBaseRouter(controller, {
    prefix: "/products",
});

export { router };
