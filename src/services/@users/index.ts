import { asyncWrapper } from "./../../@middlewares/async-wrapper";
import express, { Request, Response } from "express";
import { BaseRepository, BaseController } from "../../@base";
import createBaseRouter from "../../@base/base.router";
import { User, IUser } from "./model";
import { sendResponse } from "../../@helpers";
import { authorizedFor } from "../../@middlewares/authorized-for";

class UsersRepository extends BaseRepository<IUser> {
    constructor() {
        super(User);
    }
}

class UsersController extends BaseController<IUser> {
    constructor(repository: BaseRepository<IUser>) {
        super(repository);
    }

    async register(
        req: Request<{}, { user: IUser; token: string }, IUser, {}>,
        res: Response
    ) {
        const data = req.body;
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            throw new Error("Email already exists");
        }
        const newUser = (await User.create(data)) as IUser;
        const token = await newUser.generateAccessToken();

        sendResponse(
            res,
            { user: newUser, token },
            "Account created successfully"
        );
    }

    async login(
        req: Request<{}, { user: IUser; token: string }, IUser, {}>,
        res: Response
    ) {
        const data = req.body;
        const user = (await User.findOne({ email: data.email })) as IUser;
        if (!user) {
            throw new Error("User not found");
        }
        const isMatch = await user.comparePassword(data.password);
        if (!isMatch) {
            throw new Error("Incorrect password");
        }
        const token = await user.generateAccessToken();

        const result = { user, token };

        sendResponse(res, result, "Logged in successfully");
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

// Auth routes
router.post(
    "/auth/register",
    asyncWrapper(usersController.register.bind(usersController))
);

router.post(
    "/auth/login",
    asyncWrapper(usersController.login.bind(usersController))
);

export { router };
