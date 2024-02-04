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
            console.log("HERE");

            return next();
        }
        if (roles.includes(userRole)) {
            console.log("HERE 2");

            return next();
        }

        console.log(roles, userRole);

        throw new AuthenticationError("You are not authorized");

        // next();
        // if (roles.some((role) => typeof role === "string" && role === "*")) {
        //     return next();
        // }
        // if (!user) {
        //     throw new AuthenticationError("Invalid token");
        // }
        // const userRole = user.role;
        // if (roles.includes(userRole)) {
        //     return next();
        // }
        // if (
        //     roles.some((role) => typeof role === "string" && role === userRole)
        // ) {
        //     return next();
        // }

        // throw new AuthenticationError("You are not authorized");
    };
};
