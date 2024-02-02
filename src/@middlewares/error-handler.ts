import { Request, Response, NextFunction } from "express";

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let title: string = err.title || "Internal Server Error";
    let type: string = err.type || "internal_server_error";
    let statusCode: number = err.statusCode || 500;
    let message: string = err.message || "Internal Server Error";

    // VALIDATION ERROR
    if (err.name === "ValidationError") {
        const keys = Object.keys(err.errors);
        title = "Validation Error";
        type = "validation_error";
        statusCode = 400;
        message = keys.map((key) => err.errors[key].message).join(", ");
    }

    // E11000 duplicate key error
    if (err.code === 11000) {
        title = "Duplicate Key Error";
        type = "duplicate_key_error";
        statusCode = 400;
        message = err.message;
    }

    res.status(statusCode).json({
        result: null,
        result_message: {
            message,
            title,
            statusCode,
            type,
        },
    });
};
