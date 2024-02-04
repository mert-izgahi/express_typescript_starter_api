// Static Imports
import express from "express";
import { BaseRepository, BaseController, createBaseRouter } from "..";

// Dynamic Imports
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

const _router = createBaseRouter(usersController, {
    prefix: "/users",
    roles: ["*"], // alow all users without access token
    //roles: ["user"],  // allow only users
    //roles: ["admin"], // allow only admins
    // roles: ["user", "admin"],    // allow users and admins after auth
});

const router = express.Router();
router.use(_router);

export { router };
