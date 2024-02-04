// Fixed Imports
import express from "express";
import { usersRouter, sessionRouter } from "@starter";

// Custom Imports
import { router as categoryRouter } from "./categories";
import { router as productRouter } from "./products";

const router = express.Router();
router.use("/api", usersRouter);
router.use("/api", sessionRouter);

router.use("/api", categoryRouter);
router.use("/api", productRouter);

export { router };
