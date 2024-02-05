import express from "express";
import supertest from "supertest";
import { Server } from "../../@starter";
// Category
import { Category } from "../services/categories/model";
import { router as productRouter } from "../services/products";

// TEST CONFIG
const PORT = 6002;
const dbUrl = "mongodb://localhost:27017/test";

const router = express.Router();
router.use("/api/products", productRouter);

const server = new Server(PORT, dbUrl, router);
const app = server.app;
describe("products", () => {
    beforeAll(async () => {
        // Start Server
        server.start();
        // Clear DB
        await Category.deleteMany({});
    });

    describe("getAll Route", () => {
        describe("Without roles", () => {
            it("should return all products", async () => {
                const response = await supertest(app).get("/api/products");
                const {
                    body: { result, result_message },
                } = await response;
                const { rows } = await result;
                expect(response.status).toBe(200);

                // expect(rows).toEqual(
                //     expect.arrayContaining([
                //         expect.objectContaining({
                //             name: expect.any(String),
                //             description: expect.any(String),
                //             id: expect.any(String),
                //         }),
                //     ])
                // );
            });
        });
    });
});
