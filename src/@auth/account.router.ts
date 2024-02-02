// import express from "express";
// import { AccountModel, IAccount } from "./account.model";
// import AccountController from "./account.controller";
// import { asyncWrapper } from "../@middlewares";
// import UsersController from "./users.controller";
// import { BaseRepository } from "../@base";

// const repository: BaseRepository<IAccount> = new BaseRepository<IAccount>(
//     AccountModel
// );

// const accountController: AccountController<IAccount> =
//     new AccountController<IAccount>(repository);

// const usersController: UsersController<IAccountDocument> =
//     new UsersController<IAccountDocument>(repository);

// const createAuthRouter = (
//     route: string = "/auth",
//     middlewares: any[] = []
// ): express.Router => {
//     const router = express.Router();
//     if (middlewares.length > 0) {
//         router.use(middlewares);
//     }

//     router.post(
//         `${route}/register`,
//         asyncWrapper(accountController.register.bind(accountController))
//     );
//     router.post(
//         `${route}/login`,
//         asyncWrapper(accountController.login.bind(accountController))
//     );

//     router.post(
//         `${route}/logout`,
//         asyncWrapper(accountController.logout.bind(accountController))
//     );

//     router.get(
//         `${route}/me`,
//         asyncWrapper(accountController.me.bind(accountController))
//     );
//     router.put(
//         `${route}/me`,
//         asyncWrapper(accountController.updateMe.bind(accountController))
//     );
//     router.delete(
//         `${route}/me`,
//         asyncWrapper(accountController.deleteMe.bind(accountController))
//     );
//     return router;
// };

// const createUsersRouter = (
//     route: string = "/users",
//     middlewares: any[] = []
// ): express.Router => {
//     const router = express.Router();
//     if (middlewares.length > 0) {
//         router.use(middlewares);
//     }
//     router.get(
//         `${route}/:id`,
//         asyncWrapper(usersController.getRecordById.bind(usersController))
//     );
//     router.get(
//         `${route}`,
//         asyncWrapper(usersController.getRecords.bind(usersController))
//     );
//     return router;
// };

// export default createAuthRouter;

// const AccountRouter = createAuthRouter();
// const UsersRouter = createUsersRouter();
// export { AccountRouter, UsersRouter };
