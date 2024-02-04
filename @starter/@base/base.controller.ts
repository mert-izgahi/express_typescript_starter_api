import { Document, FilterQuery } from "mongoose";
import { BaseRepository } from "./base.repository";
import { Request, Response } from "express";
import { IController } from "../@types";

export class BaseController<T extends Document> implements IController<T> {
    constructor(protected readonly repository: BaseRepository<T>) {}

    async getAll(req: Request, res: Response) {
        const filterOptions = res.locals.filterOptions;
        const filter: FilterQuery<T> = {
            name: { $regex: res.locals.filterOptions.search, $options: "i" },
        };
        const results = await this.repository.getRecords(filter, filterOptions);
        this._sendResponse(res, results, "Records retrieved successfully");
    }

    async createOne(req: Request<{}, {}, T>, res: Response) {
        const body = req.body;
        const result = await this.repository.createRecord(body);
        this._sendResponse(res, result, "Record created successfully");
    }

    async updateOne(req: Request<{ id: string }, {}, T>, res: Response) {
        const { id } = req.params;
        const body = req.body;
        const result = await this.repository.updateRecordById(id, body);
        this._sendResponse(res, result, "Record updated successfully");
    }

    async deleteOne(req: Request<{ id: string }, {}, {}>, res: Response) {
        const { id } = req.params;
        const result = await this.repository.deleteRecordById(id);
        this._sendResponse(res, result, "Record deleted successfully");
    }

    async getOneById(req: Request<{ id: string }, {}, {}>, res: Response) {
        const { id } = req.params;
        const result = await this.repository.getRecordById(id);
        this._sendResponse(res, result, "Record retrieved successfully");
    }

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
