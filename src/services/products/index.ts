import { BaseController, BaseRepository, createBaseRouter } from "@starter";
import { Product, IProduct } from "./model";

const repository = new BaseRepository<IProduct>(Product);
const controller = new BaseController<IProduct>(repository);

const router = createBaseRouter(controller, {
    prefix: "/products",
});

export { router };
