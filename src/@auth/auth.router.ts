import AuthController from "./auth.controller";
import express from "express";

const createAuthRouter = (
    controller: AuthController<any>,
    route: string = "/auth",
    middlewares: any[] = []
): express.Router => {
    const router = express.Router();
    if (middlewares.length > 0) {
        router.use(middlewares);
    }
    router.post(`${route}/register`, controller.register.bind(controller));
    router.post(`${route}/login`, controller.login.bind(controller));
    router.post(`${route}/logout`, controller.logout.bind(controller));
    router.post(`${route}/refresh`, controller.refresh.bind(controller));
    router.post(
        `${route}/forget-password-request`,
        controller.forgetPasswordRequest.bind(controller)
    );

    router.post(
        `${route}/reset-password/:token`,
        controller.resetPassword.bind(controller)
    );

    router.post(
        `${route}/verify-email-request`,
        controller.verifyEmailRequest.bind(controller)
    );

    router.post(
        `${route}/verify-email/:token`,
        controller.verifyEmail.bind(controller)
    );

    router.get(`${route}/me`, controller.me.bind(controller));

    router.put(`${route}/me`, controller.updateMe.bind(controller));

    router.delete(`${route}/me`, controller.deleteMe.bind(controller));

    return router;
};

export default createAuthRouter;
