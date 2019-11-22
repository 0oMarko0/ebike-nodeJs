import chai from "chai";
import Point from "../../src/model/geometry/point";

const expect = chai.expect;

describe("MODEL GeoPoint", () => {
    it("should return a valid model", () => {
        const latitude = 46.77656;
        const longitude = -71.2718;
        const geoPoint = new Point(longitude, latitude);
        const geoPointModel = geoPoint.toGeometry;

        expect(geoPointModel).to.have.property("type");
        expect(geoPointModel).to.have.property("coordinates");
        expect(geoPointModel.type).to.be.equal("Point");
        expect(geoPointModel.coordinates[0]).to.be.equal(longitude);
        expect(geoPointModel.coordinates[1]).to.be.equal(latitude);
    });
});
