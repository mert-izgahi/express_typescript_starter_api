import {
    BaseRepository,
    createBaseRouter,
    BaseController,
} from "../../../@starter";
import { Category, ICategory } from "./model";

const repository = new BaseRepository<ICategory>(Category);
const controller = new BaseController<ICategory>(repository);
const router = createBaseRouter<ICategory>(controller, {
    //roles: ["user"],
    roles: [
        { action: "getAll", role: "user" },
        { action: "createOne", role: "*" },
    ],
});

export { router };
