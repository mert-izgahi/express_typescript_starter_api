import { Request, Response } from "express";
import { CategoryRepository } from "./repository";
import { Category, ICategory } from "./model";

import { asyncWrapper } from "../../middlewares";
import { BaseController } from "../../@base";
import { sendResponse } from "../../helpers";

class CategoryController extends BaseController<ICategory> {
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

export { CategoryController };
