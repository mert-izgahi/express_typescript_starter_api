# express_typescript_starter_api

This is a starter project of api services with express and typescript. The project is using `ts-node-dev` for development and `ts-node` for production. it's support generic types and decorators.

### DON'T DELETE OR CHANGE

-   @base folder
-   @types folder
-   @errors folder
-   @middlewares folder
-   @helpers folder
-   services/@users folder

# Authentication

in `services/auth` folder you can find @users service. You can see it in `index.ts` and `model.ts`.

you can modify `model.ts` to add new fields for authentication.

in `index.ts` you can see how to use @base folder and @types folder to create generic db model.

for example:

```ts
// Static Imports
import express, { Request, Response } from "express";
import { BaseRepository, BaseController, createBaseRouter } from "../../@base";
import { asyncWrapper } from "./../../@middlewares";
import { sendResponse } from "../../@helpers";

// Dynamic Imports
import { User, IUser } from "./model";

const usersRepository = new BaseRepository<IUser>(User);
const usersController = new BaseController<IUser>(usersRepository);
const router = createBaseRouter(usersRepository, {
    prefix: "users",
    roles: ["*"],
});

export { router };
```

and in `./src/services/router.ts` you can see how to use it.

```ts
// ..
import { router as usersRouter } from "./@users";

// ..
router.use("/api", usersRouter);

// ..
export { router };
```

# How to use

Now in Postman you can create services for
baseUrl : http://localhost:5001/api

-   Get All users at `${baseUrl}/users`
-   Get One user at `${baseUrl}/users/1`
-   Create user at `${baseUrl}/users`
-   Update user at `${baseUrl}/users/1`
-   Delete user at `${baseUrl}/users/1`

# Use Roles

-   `*` for all roles, without login
-   `admin` for admin role
-   `user` for user role
-   `user`, `admin` for both role, login required

# Overwrite Base Controllers:

in the example for users controller we can add auth routes
`register` and `login` route.

```ts
// Static Imports
import express, { Request, Response } from "express";
import { BaseRepository, BaseController, createBaseRouter } from "../../@base";
import { asyncWrapper } from "./../../@middlewares";
import { sendResponse } from "../../@helpers";

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
```

# Search and Filter

By default in each request with append following object to res.locals

```ts
import { Request, Response, NextFunction } from "express";
import { IFilterOptions } from "../@types";

export const filterApi = async (
    req: Request<{}, {}, {}, IFilterOptions>,
    res: Response,
    next: NextFunction
) => {
    const {
        page = 1,
        limit = 10,
        sort = "createdAt",
        order = "desc",
        search = "",
        select = "",
    } = req.query;

    res.locals.filterOptions = {
        page: Number(page),
        limit: Number(limit),
        sort,
        order: order === "asc" ? 1 : -1,
        search,
        select: select ? select.split(",") : undefined,
    };

    next();
};
```

and in GetAll method we are waiting for following query

```ts
filterOptions: {
    page: 1,
    limit: 10,
    sort: "createdAt",
    order: -1,
    search: "",
    select: undefined,
}
```

and the response will be like this format

```ts
{ rows: T[]; total: number; totalPages: number }
```
