import request from "supertest";
import app from "../../src/app";
import chai from "chai";

const expect = chai.expect;

describe("GET /restaurant/type", () => {
    const RESTAURENT_TYPE_ROUTE = "/restaurant/type";

    it("should return 200 OK", async () => {
        request(await app)
            .get(RESTAURENT_TYPE_ROUTE)
            .expect(200);
    });

    it("should have a valid response", async () => {
        request(await app)
            .get(RESTAURENT_TYPE_ROUTE)
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.be.an("array");
            });
    });
});
