import GeoPoint, { GeoPointModel } from "../model/geo-point";
import JourneyRepo from "../data/repository/journey-repo";

export default class JourneyController {
    private journeyRepo: JourneyRepo;
    constructor(journeyRepo: JourneyRepo) {
        this.journeyRepo = journeyRepo;
    }

    startingPoint(): GeoPointModel {
        return new GeoPoint(46.77656, -71.2718).toModel;
    }

    async getBikePathLength() {
        return await this.journeyRepo.getBikePathLength();
    }
}
