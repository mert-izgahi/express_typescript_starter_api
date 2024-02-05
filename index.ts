// Server
import express from "express";
import { Server } from "./@starter";

// Src
import { router as categoryRouter } from "./src/services/categories";
import { router as productRouter } from "./src/services/products";

// ENV
import configs from "./config";

const PORT: number = Number(configs.PORT) || 5000;
const MONGO_URI: string = configs.MONGO_URI;

const router = express.Router();

router.use("/api/categories", categoryRouter);
router.use("/api/products", productRouter);

const server = new Server(PORT, router);
server.connectDb(MONGO_URI);
server.start();
