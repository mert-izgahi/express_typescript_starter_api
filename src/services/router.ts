import express from "express";

import { router as categoryRouter } from "./categories";
import { router as productRouter } from "./products";
import { router as usersRouter } from "./@users";

const router = express.Router();

router.use("/api", categoryRouter);
router.use("/api", productRouter);
router.use("/api", usersRouter);
export { router };
