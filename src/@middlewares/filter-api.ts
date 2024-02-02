import { Request, Response, NextFunction } from "express";
import { IFilterOptions } from "../@types";

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
        select = "",
    } = req.query;

    res.locals.filterOptions = {
        page: Number(page),
        limit: Number(limit),
        sort,
        order: order === "asc" ? 1 : -1,
        search,
        select: select ? select.split(",") : undefined,
    };

    next();
};
