import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../../config";
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
                const decoded = jwt.verify(token, config.JWT_SECRET);

                if (decoded) {
                    res.locals.user = decoded;
                    return next();
                }
            }
        }
    } catch (error) {
        next(error);
    }
};
