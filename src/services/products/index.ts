import {
    BaseController,
    BaseRepository,
    createBaseRouter,
} from "../../../@starter/@base";
import { Product, IProduct } from "./model";

const repository = new BaseRepository<IProduct>(Product);
const controller = new BaseController<IProduct>(repository);

const router = createBaseRouter<IProduct>(controller, {
    roles: ["*"],
});

export { router };
