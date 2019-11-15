import chai from "chai";
import GeoPoint from "../../src/model/geo-point";

const expect = chai.expect;

describe("MODEL GeoPoint", () => {
    it("should return a valid model", () => {
        const latitude = 46.77656;
        const longitude = -71.2718;
        const geoPoint = new GeoPoint(latitude, longitude);
        const geoPointModel = geoPoint.toModel;

        expect(geoPointModel).to.have.property("type");
        expect(geoPointModel).to.have.property("coordinates");
        expect(geoPointModel.type).to.be.equal("GeoPoint");
        expect(geoPointModel.coordinates[0]).to.be.equal(longitude);
        expect(geoPointModel.coordinates[1]).to.be.equal(latitude);
    });
});
