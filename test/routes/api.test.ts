import request from "supertest";
import app from "../../src/app";
import chai from "chai";

const expect = chai.expect;

describe("GET /api/heartbeat", () => {
    const HEART_BEAT_ROUTE = "/api/heartbeat";

    it("/heartbeat should return 200 OK", () => {
        request(app)
            .get(HEART_BEAT_ROUTE)
            .expect(200);
    });

    it("/heartbeat should have a valid response", () => {
        request(app)
            .get(HEART_BEAT_ROUTE)
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.have.property("nb_restaurants");
                expect(res.body).to.have.property("total_path_length");
            });
    });
});

describe("GET /api/heartbeat", () => {

});
