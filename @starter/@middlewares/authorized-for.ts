import { NextFunction, Request, Response } from "express";
import { AuthenticationError } from "../@errors";
import { IRoles } from "../@base/base.types";

export const authorizedFor = (
    ...roles: string[]
): ((req: Request, res: Response, next: NextFunction) => void) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = res.locals.user;
        if (roles.includes("*")) {
            return next();
        }

        if (!user) {
            throw new AuthenticationError("Invalid token");
        }

        if (!roles.includes(user.role)) {
            throw new AuthenticationError("You are not authorized");
        }

        next();
    };
};
