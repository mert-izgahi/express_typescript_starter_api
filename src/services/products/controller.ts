import { Request, Response } from "express";
import { asyncWrapper } from "../../middlewares";
import Product from "./model";
import { FilterQuery } from "mongoose";
import { IProduct } from "../../types";
import { sendResponse } from "../../helpers";

export const getAll = asyncWrapper(async (req: Request, res: Response) => {
    const filterOptions = res.locals.filterOptions;
    const filter: FilterQuery<IProduct> = {};

    // Search by name
    filter.name = { $regex: res.locals.filterOptions.search, $options: "i" };

    const results = await Product.getRecords(filter, filterOptions);

    sendResponse(res, results, "Products retrieved successfully");
});

export const createOne = asyncWrapper(
    async (req: Request<{}, {}, IProduct>, res: Response) => {
        const body = req.body;
        const result = await Product.createRecord(body);
        sendResponse(res, result, "Product created successfully");
    }
);

export const updateOne = asyncWrapper(
    async (
        req: Request<{ id: string }, {}, Partial<IProduct>>,
        res: Response
    ) => {
        const { id } = req.params;
        const body = req.body;
        const result = await Product.updateRecordById(id, body);
        sendResponse(res, result, "Product updated successfully");
    }
);

export const deleteOne = asyncWrapper(
    async (req: Request<{ id: string }, {}, {}>, res: Response) => {
        const { id } = req.params;
        const result = await Product.deleteRecordById(id);
        sendResponse(res, result, "Product deleted successfully");
    }
);

export const getOneById = asyncWrapper(
    async (req: Request<{ id: string }, {}, {}>, res: Response) => {
        const { id } = req.params;
        const result = await Product.getRecordById(id);
        sendResponse(res, result, "Product retrieved successfully");
    }
);
