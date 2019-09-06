import request from "supertest";
import app from "../src/app";

describe("GET /api/status", () => {
    it("should return 200 OK", () => {
        return request(app)
            .get("/api/status")
            .expect(200);
    });
});
