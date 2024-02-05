import {
    BaseRepository,
    createBaseRouter,
    BaseController,
} from "../../../@starter";
import { Category, ICategory } from "./model";

const repository = new BaseRepository<ICategory>(Category);
const controller = new BaseController<ICategory>(repository);
const router = createBaseRouter<ICategory>(controller, {
    roles: ["*"],
    // roles: [
    //     { action: "getAll", role: "*" },
    //     { action: "createOne", role: "admin" },
    //     { action: "getOneById", role: "*" },
    // ],
});

export { router };
