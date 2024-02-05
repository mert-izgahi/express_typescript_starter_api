import express from "express";
import supertest from "supertest";
import { Server } from "../../@starter";
// Category
import { Category } from "../services/categories/model";
import { router as categoryRouter } from "../services/categories";

// TEST CONFIG
const PORT = 6001;
const dbUrl = "mongodb://localhost:27017/test";

const router = express.Router();
router.use("/api/categories", categoryRouter);

const server = new Server(PORT, dbUrl, router);
const app = server.app;
describe("categories", () => {
    beforeAll(async () => {
        // Start Server
        server.start();
        // Clear DB
        await Category.deleteMany({});
    });

    describe("getAll Route", () => {
        describe("Without roles", () => {
            it("should return all categories", async () => {
                const response = await supertest(app).get("/api/categories");
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
