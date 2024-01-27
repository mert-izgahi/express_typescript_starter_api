import { Request, Response, NextFunction } from "express";
import { IFilterOptions } from "../types";
import { logger } from "../helpers";

export const filterApi = async (
    req: Request<{}, {}, {}, IFilterOptions>,
    res: Response,
    next: NextFunction
) => {
    const {
        page = 1,
        limit = 10,
        sort = "createdAt",
        order = "desc",
        search = "",
    } = req.query;

    res.locals.filterOptions = {
        page: Number(page),
        limit: Number(limit),
        sort,
        order,
        search,
    };

    next();
};
