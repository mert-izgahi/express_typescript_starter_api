import express from "express";
import supertest from "supertest";
import { Server } from "../../@starter";
import { MongoMemoryServer } from "mongodb-memory-server";

// Category
import { Category, ICategory } from "../services/categories/model";
import { router as categoryRouter } from "../services/categories";

let server: Server;
let app: express.Application;
let endPoint = "/api/categories";
let record: ICategory | null;

const categoriesData = [
    {
        name: "Sofa",
        description: "Sofa for your comfort",
    },
    {
        name: "Chair",
        description: "Chair for your comfort",
    },
    {
        name: "Table",
        description: "Table for your comfort",
    },
];

describe(endPoint, () => {
    beforeAll(async () => {
        // Setup DB Memory
        const mongoServer = await MongoMemoryServer.create();

        // TEST CONFIG
        const PORT = 6001;
        const dbUrl = mongoServer.getUri();
        const router = express.Router();
        router.use(endPoint, categoryRouter);

        // Setup Server
        server = new Server(PORT, router);
        app = server.app;
        server.connectDb(dbUrl);
        server.start();
    });

    afterAll(async () => {
        // Clear DB
        await Category.deleteMany({});

        // Stop Server
        server.disconnectDb();
        server.close();
    });

    describe(`${endPoint} Create One Route`, () => {
        describe("Without roles", () => {
            it("should create a record", async () => {
                const response = await supertest(app)
                    .post(endPoint)
                    .send(categoriesData[0]);

                const {
                    body: { result, result_message },
                } = await response;

                record = result;

                expect(response.status).toBe(200);
                expect(result).toEqual(
                    expect.objectContaining({
                        name: expect.any(String),
                        description: expect.any(String),
                        id: expect.any(String),
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String),
                    })
                );
            });
        });
    });

    describe(`${endPoint} Get All Route`, () => {
        describe("Without roles", () => {
            it("should return all records", async () => {
                const response = await supertest(app).get(endPoint);
                const {
                    body: { result, result_message },
                } = await response;
                const { rows } = await result;
                expect(response.status).toBe(200);
                expect(rows.length).toBe(1);
                expect(rows).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            name: expect.any(String),
                            description: expect.any(String),
                            id: expect.any(String),
                        }),
                    ])
                );
            });
        });
    });

    describe(`${endPoint} Get One Route`, () => {
        describe("Without roles", () => {
            it("should return a record", async () => {
                const response = await supertest(app).get(
                    `${endPoint}/${record?.id}`
                );
                const {
                    body: { result, result_message },
                } = await response;

                expect(response.status).toBe(200);
                expect(result).toEqual(
                    expect.objectContaining({
                        name: expect.any(String),
                        description: expect.any(String),
                        id: expect.any(String),
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String),
                    })
                );
            });
        });
    });
});
