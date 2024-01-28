import express from "express";
// import { router as categoryRouter } from "./categories/router";
import { router as categoryRouter } from "./categories";
import { router as productRouter } from "./products/router";

const router = express.Router();

router.use("/api", categoryRouter);
router.use("/api", productRouter);

export { router };
