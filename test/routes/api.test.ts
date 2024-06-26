import request from "supertest";
import app from "../../src/app";
import chai from "chai";

const expect = chai.expect;

jest.mock("mongodb");
jest.mock("../../src/data/repository/repo.ts");

describe("GET /api/heartbeat", () => {
    const STATISTICS_ROUTE = "/api/statistics";

    it("should return 200 OK", () => {
        request(app)
            .get(STATISTICS_ROUTE)
            .expect(200);
    });

    it("should have a valid response", () => {
        request(app)
            .get(STATISTICS_ROUTE)
            .expect(200);
    });
});