import request from "supertest";
import server from "../server";
import connectionPool from "../data/db";

describe("Category", () => {
    it("should return all categories", async () => {

        const result = 200

        const response = await request(server).get("/api/v1/categories")
          
        expect(response.status).toBe(result);
        expect(response.body.data.length).toBeGreaterThan(0);
    });

    it("should return a single category", async () => {
        const resultId = 'f0d8e9cc-d717-11ee-8fcb-036d1a3bdb96'

        const response = await request(server).get(`/api/v1/categories/${resultId}`)        

        expect(response.status).toBe(200);
        expect(response.body.data[0].categories_id).toBe(resultId);
        expect(response.body.data[0].categories_name).toBe("Frutas");
    });
})


afterAll(async () =>  await connectionPool.end())
