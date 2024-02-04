import { NextFunction, Request, Response } from "express";
import { AuthenticationError } from "../@errors";
import { RoleDefinition } from "../@types";

export const authorizedFor = (
    roles: RoleDefinition[]
): ((req: Request, res: Response, next: NextFunction) => void) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = res.locals.user;

        if (roles.some((role) => typeof role === "string" && role === "*")) {
            return next();
        }
        if (!user) {
            throw new AuthenticationError("Invalid token");
        }
        const userRole = user.role;
        console.log(roles);

        throw new AuthenticationError("You are not authorized");
    };
};
