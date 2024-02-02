import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../../config";
import { AuthenticationError } from "../@errors";
export const deserializerUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const headers = req.headers;

        const authorization = headers.authorization;

        if (authorization) {
            const token = authorization.split(" ")[1];

            if (token) {
                jwt.verify(
                    token,
                    config.JWT_SECRET,
                    {
                        maxAge: config.JWT_EXPIRE,
                    },
                    (err, decoded) => {
                        if (err) {
                            throw new AuthenticationError("Invalid token");
                        }
                        if (decoded) {
                            res.locals.user = decoded;
                        }
                    }
                );
            }
        }

        return next();
    } catch (error) {
        next(error);
    }
};
