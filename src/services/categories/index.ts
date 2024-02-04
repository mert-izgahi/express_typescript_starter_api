import {
    BaseController,
    BaseRepository,
    createBaseRouter,
} from "../../../@starter/@base";
import { Category, ICategory } from "./model";

const repository = new BaseRepository<ICategory>(Category);
const controller = new BaseController<ICategory>(repository);
const router = createBaseRouter<ICategory>(controller);

export { router };
