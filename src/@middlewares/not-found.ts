import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../@errors";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    throw new NotFoundError(error.message);
};
