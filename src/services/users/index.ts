import {
    BaseController,
    BaseRepository,
    createBaseRouter,
} from "../../../@starter/@base";
import { User, IUser } from "./model";

class UsersRepository extends BaseRepository<IUser> {
    constructor() {
        super(User);
    }
}

class UsersController extends BaseController<IUser> {
    constructor(repository: BaseRepository<IUser>) {
        super(repository);
    }
}

const usersRepository = new UsersRepository();
const usersController = new UsersController(usersRepository);
const router = createBaseRouter<IUser>(usersController, {
    middlewares: [],
    roles: ["admin"],
});

export { router };
