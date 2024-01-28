import { Request, Response } from "express";
import { asyncWrapper } from "../../middlewares";
import User from "./model";
import { sendResponse } from "../../helpers";
import { IUser } from "../../types";

export const register = asyncWrapper(
    async (
        req: Request<{}, {}, { email: string; password: string; name: string }>,
        res: Response
    ) => {
        const { email, password, name } = req.body;
        // CHECK IF USER ALREADY EXISTS
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("User already exists");
        }

        const result = await User.create({
            email,
            password,
            name,
        } as IUser);
        sendResponse(res, result, "User created successfully");
    }
);
