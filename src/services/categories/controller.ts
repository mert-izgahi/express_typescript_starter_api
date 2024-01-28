import { Request, Response } from "express";
import { ICategory } from "./model";
import Category from "./model";
import CategoryRepository from "./repository";
import { asyncWrapper } from "../../middlewares";
import { BaseController } from "../../@base";
import { sendResponse } from "../../helpers";

export class CategoryController extends BaseController<ICategory> {
    constructor(repository: CategoryRepository) {
        super(repository);
    }

    // Add custom methods here
    getOneBySlug = asyncWrapper(async (req: Request, res: Response) => {
        const { slug } = req.params;

        const result = await Category.findOne({ slug });

        sendResponse(res, result, "Record retrieved successfully");
    });
}

export default CategoryController;
