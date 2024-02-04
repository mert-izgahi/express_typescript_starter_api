import { NextFunction, Request, Response } from "express";
import { AuthenticationError } from "../@errors";
import { RoleDefinition } from "../@types";

export const authorizedFor = (
    ...roles: RoleDefinition[]
): ((req: Request, res: Response, next: NextFunction) => void) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = res.locals.user;

        if (!user) {
            throw new AuthenticationError("Invalid token");
        }
        if (roles.length === 0) {
            return next();
        }

        const userRole = user.role;
        if (roles.some((role) => role === "*")) {
            return next();
        }
        if (roles.includes(userRole)) {
            return next();
        }

        throw new AuthenticationError("You are not authorized");
    };
};
