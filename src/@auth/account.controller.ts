import { Request, Response } from "express";
// import AuthRepository from "./account.repository";
import { BaseRepository } from "../@base";
import {
    RegisterInputModel,
    LoginInputModel,
    IAccountsController,
} from "./account.types";
import { sendResponse } from "../@helpers";
import { AuthenticationError, BadRequestError } from "../@errors";
import { Document } from "mongoose";

// class AccountController<T extends Document> implements IAccountsController<T> {
//     constructor(protected readonly repository: BaseRepository<T>) {}
//     logout(req: Request<{}, {}, { accessToken: null }>, res: any): void {
//         try {
//             res.clearCookie("accessToken");
//             res.clearCookie("refreshToken");
//             res.sendStatus(200);
//             sendResponse(
//                 res,
//                 {
//                     accessToken: null,
//                 },
//                 "User logged out successfully"
//             );
//         } catch (error) {
//             console.log(error);
//             throw error;
//         }
//     }

//     async register(
//         req: Request<{}, { account: T; token: string }, RegisterInputModel>,
//         res: Response
//     ) {
//         const existingAccount = await this.repository.getRecord({
//             email: req.body.email,
//         });

//         if (existingAccount) {
//             throw new AuthenticationError("Account already exists");
//         }

//         const account = await this.repository.createRecord(req.body as T);

//         const accessToken = await account?.generateAccessToken();
//         const result = { accessToken, account };

//         sendResponse(res, result, "User created successfully");
//     }

//     async login(
//         req: Request<{}, { user: T; token: string }, LoginInputModel>,
//         res: Response
//     ) {
//         const account = await this.repository.getRecord({
//             email: req.body.email,
//         });

//         if (!account) {
//             throw new AuthenticationError("Invalid email or password");
//         }

//         const validPassword = await account.comparePassword(req.body.password);
//         if (!validPassword) {
//             throw new AuthenticationError("Invalid email or password");
//         }

//         const accessToken = await account?.generateAccessToken();

//         const result = { accessToken, account };
//         sendResponse(res, result, "User logged in successfully");
//     }

//     async me(req: Request<{}, { account: T }>, res: Response) {
//         const currentUser = res.locals.user;
//         const { _id } = currentUser;
//         const account = await this.repository.getRecord({ _id });
//         if (!account) {
//             throw new BadRequestError("User not found");
//         }
//         sendResponse(res, account, "User retrieved successfully");
//     }

//     async updateMe(req: Request<{}, {}, Partial<T>>, res: any) {
//         try {
//             const currentUser = res.locals.user;
//             const { _id } = currentUser;
//             const account = await this.repository.updateRecordById(
//                 _id,
//                 req.body
//             );
//             sendResponse(res, account, "Account updated successfully");
//         } catch (error) {
//             console.log(error);
//             throw error;
//         }
//     }
//     async deleteMe(req: Request<{}, { account: T }>, res: any) {
//         try {
//             const currentUser = res.locals.user;
//             const { _id } = currentUser;
//             const account = await this.repository.deleteRecordById(_id);
//             sendResponse(res, account, "Account deleted successfully");
//         } catch (error) {
//             console.log(error);
//             throw error;
//         }
//     }
// }

// class AccountController<T extends Document>
//     extends BaseRepository<T>
//     implements IAccountsController<T>
// {
//     constructor(protected readonly repository: BaseRepository<T>) {
//         super(repository);
//     }
// }

// export default AccountController;
