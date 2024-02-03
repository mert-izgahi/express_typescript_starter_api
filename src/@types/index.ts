import { Request } from "express";
import { FilterQuery } from "mongoose";

export interface IFilterOptions {
    page: number;
    limit: number;
    sort: string;
    order: string;
    search: string;
    select?: string | undefined;
}

export interface IRepository<T> {
    createRecord(data: T): Promise<T | null>;
    updateRecordById(id: string, data: Partial<T>): Promise<T | null>;
    deleteRecordById(id: string): Promise<T | null>;
    deleteRecord(filter: FilterQuery<T>): Promise<T | null>;
    getRecord(
        filter: FilterQuery<T>,
        options?: IFilterOptions
    ): Promise<T | null>;
    getRecordById(id: string): Promise<T | null>;
    getRecords(
        filter: FilterQuery<T | []>,
        options?: IFilterOptions
    ): Promise<{ rows: T[]; total: number; totalPages: number }>;
}

export interface IAuthRepository<T> {
    register(data: T): Promise<{ user: T; token: string } | null>;
    login(data: T): Promise<{ user: T; token: string } | null>;
    logout(): Promise<{ user: null; token: null } | null>;
    me(): Promise<T | null>;
    updateMe(data: T): Promise<T | null>;
    deleteMe(): Promise<T | null>;
}

export interface IController<T> {
    getAll(req: Request, res: any): void;
    getOneById(req: Request<{ id: string }>, res: any): void;
    createOne(req: Request<{}, { account: T }, T>, res: any): void;
    updateOne(req: Request<{ id: string }, {}, Partial<T>>, res: any): void;
    deleteOne(req: Request<{ id: string }>, res: any): void;
}

export interface TokenPayload {
    _id: string;
    name: string;
    email: string;
    role: string;
    session: string;
}
