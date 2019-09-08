import request from "supertest";
import app from "../../src/app";

describe("GET /api/*", () => {
    const HEART_BEAT_ROUTE = "/api/heartbeat";

    it("/heartbeat should return 200 OK", () => {
        return request(app)
            .get("/api/heartbeat")
            .expect(200);
    });
});
