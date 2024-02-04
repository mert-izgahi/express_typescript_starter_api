// Static Imports
import express, { Request, Response } from "express";
import { Session } from "./model";
import { sendResponse } from "../../@helpers";
import { User } from "../users/model";
import { AuthenticationError } from "../../@errors";
import { asyncWrapper } from "../../@middlewares";
import { authorizedFor } from "../../@middlewares/authorized-for";

const sessionController = {
    registerUser: async (
        req: Request<{}, {}, { name: string; email: string; password: string }>,
        res: Response
    ): Promise<void> => {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new AuthenticationError("Email already exists");
        }

        const user = await User.create({ name, email, password });
        const agent = req.headers["user-agent"];

        const session = await Session.create({
            user: user._id,
            agent,
        });

        if (!session) {
            throw new AuthenticationError("Session could not be created");
        }

        const tokens = await user.generateTokens({
            session: session._id.toString() as string,
        });

        const accessToken = tokens?.accessToken;
        const refreshToken = tokens?.refreshToken;

        sendResponse(
            res,
            { accessToken, refreshToken },
            "Session created successfully"
        );
    },

    createOne: async (
        req: Request<{}, {}, { email: string; password: string }>,
        res: Response
    ) => {
        const agent = req.headers["user-agent"];
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            throw new AuthenticationError("User not found");
        }

        const isValid = await user.comparePassword(req.body.password);
        if (!isValid) {
            throw new AuthenticationError("Invalid credentials");
        }

        const session = await Session.create({
            user: user._id,
            agent,
        });

        if (!session) {
            throw new AuthenticationError("Session could not be created");
        }

        const { accessToken, refreshToken } = await user.generateTokens({
            session: session._id.toString() as string,
        });

        sendResponse(
            res,
            { accessToken, refreshToken },
            "Session created successfully"
        );
    },

    deleteOne: async (req: Request<{ id: string }>, res: Response) => {
        const user = res.locals.user;

        const { session: sessionID } = user;

        const session = await Session.findByIdAndUpdate(sessionID, {
            valid: false,
        });

        if (!session) {
            throw new AuthenticationError("Session not found");
        }

        sendResponse(res, session, "Session deleted successfully");
    },

    deleteAll: async (req: Request, res: Response) => {
        const user = res.locals.user;

        const { _id } = user;

        const sessions = await Session.updateMany(
            {
                user: _id,
            },
            {
                valid: false,
            }
        );

        sendResponse(
            res,
            {
                accessToken: null,
                refreshToken: null,
            },
            "Sessions deleted successfully"
        );
    },

    getAll: async (req: Request, res: Response) => {
        const user = res.locals.user;
        const { _id } = user;

        const sessions = await Session.find({
            user: _id,
            valid: true,
        });
        sendResponse(res, sessions, "Sessions retrieved successfully");
    },
};

const router = express.Router();
router.post("/sessions/register", asyncWrapper(sessionController.registerUser)); // register

router.post("/sessions", asyncWrapper(sessionController.createOne)); // login

router.delete(
    "/sessions",
    authorizedFor("admin", "user"),
    asyncWrapper(sessionController.deleteAll)
); // logout all sessions

router.get(
    "/sessions",
    authorizedFor("admin", "user"),
    asyncWrapper(sessionController.getAll)
); // get all active sessions

router.delete(
    "/sessions/:id",
    authorizedFor("admin", "user"),
    asyncWrapper(sessionController.deleteOne)
); // logout

export { router };
