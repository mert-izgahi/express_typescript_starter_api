import { Request } from "express";

export interface RegisterInputModel {
    name: string;
    email: string;
    password: string;
}

export interface LoginInputModel {
    email: string;
    password: string;
}

export interface TokenPayload {
    _id: string;
    name: string;
    email: string;
    role: string;
}

export interface IAccountDocument extends Document {
    _id?: string;
    name: string;
    email: string;
    password: string;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
    generateAccessToken(): Promise<string>;
}

export interface IAccountsController<T> {
    register(req: Request<{}, {}, T>, res: any): void;
    login(req: Request<{}, {}, T>, res: any): void;
    logout(req: Request, res: any): void;
    me(req: Request, res: any): void;
    updateMe(req: Request<{ id: string }, {}, Partial<T>>, res: any): void;
    deleteMe(req: Request, res: any): void;
}
