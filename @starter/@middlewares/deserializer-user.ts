import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../../config";
import { TokenPayload } from "../@types";
import { User } from "../@base/users/model";
import { Session } from "../@base/sessions/model";
import { logger } from "../@helpers";
import { AuthenticationError } from "../@errors";

const verifyToken = (
    token: string
): Promise<{ decoded: TokenPayload | null; expired: boolean }> => {
    return new Promise(async (resolve, reject) => {
        jwt.verify(
            token,
            config.JWT_SECRET,
            {
                maxAge: "30d",
            },
            (err, decoded) => {
                if (err) {
                    logger.error(
                        (err.message as string) || "Token verification failed"
                    );

                    return resolve({ decoded: null, expired: true });
                }
                resolve({ decoded: decoded as TokenPayload, expired: false });
            }
        );
    });
};

const regenerateTokens = (
    refreshToken: string
): Promise<{ accessToken: string; refreshToken: string }> => {
    return new Promise(async (resolve, reject) => {
        const { decoded, expired } = await verifyToken(refreshToken);
        if (expired) {
            logger.error("Refresh token expired");
            return reject(new AuthenticationError("Refresh token expired"));
        }

        const userId = decoded?._id;
        const user = await User.findById(userId);

        if (!user) {
            return reject(new Error("User not found"));
        }

        const session = await Session.findOne({ user: userId });
        if (!session) {
            return reject(new Error("Session not found"));
        }
        const tokens = await user.generateTokens({
            session: session._id.toString() as string,
        });

        resolve(tokens);
    });
};

export const deserializerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const headers = req.headers;

        const authorization = headers.authorization;

        if (authorization) {
            const accessToken = authorization.split(" ")[1];

            if (!accessToken) {
                return next();
            }

            const { decoded, expired } = await verifyToken(accessToken);
            if (expired) {
                logger.info("Verifying Refresh Token");
                const refreshToken = headers["x-refresh-token"] as
                    | string
                    | undefined;

                if (!refreshToken) {
                    return next();
                }

                const { refreshToken: newRefreshToken } =
                    await regenerateTokens(refreshToken);
                res.setHeader("x-refresh-token", newRefreshToken);

                const { decoded: newDecoded } = await verifyToken(
                    newRefreshToken
                );

                if (!newDecoded) {
                    return next();
                }
                console.log(newDecoded);

                res.locals.user = newDecoded as TokenPayload;
            }
            if (decoded) {
                res.locals.user = decoded as TokenPayload;

                return next();
            }
        }

        next();
    } catch (error) {
        next(error);
    }
};
