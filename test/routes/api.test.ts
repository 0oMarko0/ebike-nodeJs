import request from "supertest";
import app from "../../src/app";
import chai from "chai";

const expect = chai.expect;

jest.mock("mongodb");
jest.mock("../../src/data/repository/repo.ts");

describe("GET /api/heartbeat", () => {
    const HEART_BEAT_ROUTE = "/api/heartbeat";

    it("should return 200 OK", () => {
        request(app)
            .get(HEART_BEAT_ROUTE)
            .expect(200);
    });

    it("should have a valid response", () => {
        request(app)
            .get(HEART_BEAT_ROUTE)
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.have.property("nb_restaurants"); // Shoud be validate in the controller test
                expect(res.body).to.have.property("total_path_length");
            });
    });
});

describe("GET /api/readme", () => {
    const README_ROUTE = "/api/readme";

    it("should return 200 OK", () => {
        request(app)
            .get(README_ROUTE)
            .expect(200);
    });
});
