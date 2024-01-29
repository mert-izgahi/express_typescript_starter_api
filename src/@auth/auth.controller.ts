import { Request, Response } from "express";
import { asyncWrapper } from "../middlewares";
import AuthRepository from "./auth.repository";
import { RegisterModel } from "./auth.types";
import { sendResponse } from "../helpers";
import { AuthDocument } from "./auth.model";

class AuthController<T extends AuthDocument> {
    constructor(protected readonly repository: AuthRepository<T>) {}

    register = asyncWrapper(
        async (
            req: Request<{}, { user: T; token: string }, RegisterModel>,
            res: Response
        ) => {
            const result = await this.repository.register(req.body);
            sendResponse(res, result, "User created successfully");
        }
    );

    login = asyncWrapper(async (req: Request, res: Response) => {
        sendResponse(res, "Login User", "User logged in successfully");
    });

    logout = asyncWrapper(async (req: Request, res: Response) => {
        sendResponse(res, "Logout User", "User logged out successfully");
    });

    refresh = asyncWrapper(async (req: Request, res: Response) => {
        sendResponse(res, "Refresh User", "User refreshed successfully");
    });

    forgetPasswordRequest = asyncWrapper(
        async (req: Request, res: Response) => {
            sendResponse(
                res,
                "Forget Password Request",
                "Password reset request sent successfully"
            );
        }
    );

    resetPassword = asyncWrapper(async (req: Request, res: Response) => {
        sendResponse(res, "Reset Password", "Password reset successfully");
    });

    verifyEmailRequest = asyncWrapper(async (req: Request, res: Response) => {
        sendResponse(
            res,
            "Verify Email Request",
            "Email verified successfully"
        );
    });

    verifyEmail = asyncWrapper(async (req: Request, res: Response) => {
        sendResponse(res, "Verify Email", "Email verified successfully");
    });

    me = asyncWrapper(async (req: Request, res: Response) => {
        sendResponse(res, "Me User", "User retrieved successfully");
    });

    updateMe = asyncWrapper(async (req: Request, res: Response) => {
        sendResponse(res, "Update Me User", "User updated successfully");
    });

    deleteMe = asyncWrapper(async (req: Request, res: Response) => {
        sendResponse(res, "Delete Me User", "User deleted successfully");
    });
}

export default AuthController;
