import { Document, FilterQuery } from "mongoose";
import { BaseRepository } from "./base.repository";
import { Request, Response } from "express";
import { asyncWrapper } from "../middlewares";

export class BaseController<T extends Document> {
    constructor(protected readonly repository: BaseRepository<T>) {}

    getAll = asyncWrapper(async (req: Request, res: Response) => {
        const filterOptions = res.locals.filterOptions;
        const filter: FilterQuery<T> = {};
        const results = await this.repository.getRecords(filter, filterOptions);
        // sendResponse(res, results, "Records retrieved successfully");
        this._sendResponse(res, results, "Records retrieved successfully");
    });

    createOne = asyncWrapper(async (req: Request<{}, {}, T>, res: Response) => {
        const body = req.body;
        const result = await this.repository.createRecord(body);
        this._sendResponse(res, result, "Record created successfully");
    });

    updateOne = asyncWrapper(
        async (req: Request<{ id: string }, {}, T>, res: Response) => {
            const { id } = req.params;
            const body = req.body;
            const result = await this.repository.updateRecordById(id, body);
            this._sendResponse(res, result, "Record updated successfully");
        }
    );

    deleteOne = asyncWrapper(
        async (req: Request<{ id: string }, {}, {}>, res: Response) => {
            const { id } = req.params;
            const result = await this.repository.deleteRecordById(id);
            this._sendResponse(res, result, "Record deleted successfully");
        }
    );

    getOneById = asyncWrapper(
        async (req: Request<{ id: string }, {}, {}>, res: Response) => {
            const { id } = req.params;
            const result = await this.repository.getRecordById(id);
            this._sendResponse(res, result, "Record retrieved successfully");
        }
    );

    private _sendResponse = (
        res: Response,
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
}
