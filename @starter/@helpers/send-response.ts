import { Response } from "express";

export interface IResultMessage {
    message: string;
    title: string;
    statusCode: number;
    type: string;
}

export const sendResponse = (
    res: Response<{
        result: any;
        result_message: IResultMessage;
    }>,
    result: any,
    resultMessage: string
): any => {
    return res.status(200).json({
        result,
        result_message: {
            message: resultMessage,
            title: "Success",
            statusCode: 200,
            type: "success",
        },
    });
};
