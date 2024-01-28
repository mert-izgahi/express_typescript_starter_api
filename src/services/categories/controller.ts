import { Request, Response } from "express";
import { ICategory } from "./model";
import CategoryRepository from "./repository";
import { BaseController } from "../../@base";
import { asyncWrapper } from "../../middlewares";
import { sendResponse } from "../../helpers";

export class CategoryController extends BaseController<ICategory> {
    constructor(repository: CategoryRepository) {
        super(repository);
    }

    getOneBySlug = asyncWrapper(async (req: Request, res: Response) => {
        const { slug } = req.params;
        const result = await this.repository.getRecordBySlug(slug);
        sendResponse(res, result, "Record retrieved successfully");
    });
}

export default CategoryController;
