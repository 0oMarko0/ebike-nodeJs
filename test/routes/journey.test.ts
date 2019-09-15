import request from "supertest";
import app from "../../src/app";
import chai from "chai";

const expect = chai.expect;

describe("GET /journey/starting-point", () => {
    const STARTING_POINT_ROUTE = "/journey/starting-point";

    it("should return 200 OK",() => {
        request(app)
            .get(STARTING_POINT_ROUTE)
            .expect(200);
    });

    it("should have a valid response", () => {
        request(app)
            .get(STARTING_POINT_ROUTE)
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.have.property("starting_point");
                expect(res.body).to.have.deep.property("type");
                expect(res.body).to.have.deep.property("coordinates");
                expect(res.body).to.have.deep.property("latitude");
                expect(res.body).to.have.deep.property("longitude");
            });
    });
});
