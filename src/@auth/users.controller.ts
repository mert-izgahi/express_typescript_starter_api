// import { Request, Response } from "express";
// import AuthRepository from "./account.repository";
// import { IAccountDocument } from "./account.types";
// import { sendResponse } from "../@helpers";
// import { AuthenticationError, BadRequestError } from "../@errors";
// import { IFilterOptions, IRepository } from "../@types";
// import { FilterQuery } from "mongoose";

// class UsersController<T extends IAccountDocument> implements IRepository<T> {
//     constructor(protected readonly repository: AuthRepository<T>) {}
//     createRecord(data: T): Promise<T | null> {
//         throw new Error("Method not implemented.");
//     }
//     updateRecordById(id: string, data: Partial<T>): Promise<T | null> {
//         throw new Error("Method not implemented.");
//     }
//     deleteRecordById(id: string): Promise<T | null> {
//         throw new Error("Method not implemented.");
//     }
//     deleteRecord(filter: FilterQuery<T>): Promise<T | null> {
//         throw new Error("Method not implemented.");
//     }
//     getRecord(
//         filter: FilterQuery<T>,
//         options?: IFilterOptions | undefined
//     ): Promise<T | null> {
//         throw new Error("Method not implemented.");
//     }
//     getRecordById(id: string): Promise<T | null> {
//         throw new Error("Method not implemented.");
//     }
//     getRecords(
//         filter: FilterQuery<T | []>,
//         options?: IFilterOptions | undefined
//     ): Promise<{ rows: T[]; total: number; totalPages: number }> {
//         throw new Error("Method not implemented.");
//     }
// }

// export default UsersController;
