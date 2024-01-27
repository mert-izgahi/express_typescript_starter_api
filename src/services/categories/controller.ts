import { asyncWrapper } from "../../middlewares";
import { Request, Response } from "express";
import { Category } from "./model";
import { sendResponse } from "../../helpers";
import { FilterQuery } from "mongoose";
import { ICategory } from "../../types";

export const getAll = asyncWrapper(async (req: Request, res: Response) => {
    const filterOptions = res.locals.filterOptions;
    const filter: FilterQuery<ICategory> = {};

    // Search by name
    filter.name = { $regex: res.locals.filterOptions.search, $options: "i" };

    const results = await Category.getRecords(filter, filterOptions);

    sendResponse(res, results, "Categories retrieved successfully");
});

export const createOne = asyncWrapper(
    async (req: Request<{}, {}, ICategory>, res: Response) => {
        const body = req.body;
        const result = await Category.createRecord(body);

        sendResponse(res, result, "Category created successfully");
    }
);

export const updateOne = asyncWrapper(
    async (
        req: Request<{ id: string }, {}, Partial<ICategory>>,
        res: Response
    ) => {
        const { id } = req.params;
        const body = req.body;

        const result = await Category.updateRecordById(id, body);

        sendResponse(res, result, "Category updated successfully");
    }
);

export const deleteOne = asyncWrapper(
    async (req: Request<{ id: string }, {}, {}>, res: Response) => {
        const { id } = req.params;
        const result = await Category.deleteRecordById(id);

        sendResponse(res, result, "Category deleted successfully");
    }
);

export const getOneById = asyncWrapper(
    async (req: Request<{ id: string }, {}, {}>, res: Response) => {
        const { id } = req.params;

        const result = await Category.getRecordById(id);

        sendResponse(res, result, "Category retrieved successfully");
    }
);
