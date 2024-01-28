import express from "express";
import { BaseController } from "../../@base";
import Category, { ICategory } from "./model";
import CategoryRepository from "./repository";
import CategoryController from "./controller";
const router = express.Router();

const endPointName: string = "/categories";

const repository = new CategoryRepository(Category);
// const controller = new BaseController<ICategory>(repository);
const controller = new CategoryController(repository);
router
    .route(endPointName)
    .get(controller.getAll.bind(controller))
    .post(controller.createOne.bind(controller));
router
    .route(`${endPointName}/:id`)
    .get(controller.getOneById.bind(controller))
    .put(controller.updateOne.bind(controller))
    .delete(controller.deleteOne.bind(controller));

router
    .route(`${endPointName}/slug/:slug`)
    .get(controller.getOneBySlug.bind(controller));

export { router };
