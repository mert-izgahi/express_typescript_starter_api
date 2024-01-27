import express from "express";
import {
    getAll,
    createOne,
    updateOne,
    deleteOne,
    getOneById,
} from "./controller";
const router = express.Router();

// UPDATE ENDPOINT NAME TO MATCH WITH CONTROLLER WHEN CREATING ENDPOINTS
const endPointName: string = "/products";

router.route(endPointName).get(getAll).post(createOne);
router
    .route(`${endPointName}/:id`)
    .get(getOneById)
    .put(updateOne)
    .delete(deleteOne);

export { router };
