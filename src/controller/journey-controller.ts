import GeoPoint, { GeoPointModel } from "../model/geo-point";
import JourneyRepo from "../data/repository/journey-repo";
import StatisticsRepo from "../data/repository/statistics-repo";
import { meterToKilo } from "../utils/unitConversion";

export default class JourneyController {
    private journeyRepo: JourneyRepo;
    private statisticsRepo: StatisticsRepo;
    constructor(journeyRepo: JourneyRepo, statisticsRepo: StatisticsRepo) {
        this.journeyRepo = journeyRepo;
        this.statisticsRepo = statisticsRepo;
    }

    startingPoint(): GeoPointModel {
        return new GeoPoint(46.77656, -71.2718).toModel;
    }

    async getHeartBeat() {
        const { totalLength } = await this.statisticsRepo.getBikePathLength();
        return {
            nb_restaurants: await this.statisticsRepo.getNumberOfRestaurant(),
            total_path_length: totalLength,
        };
    }

    getCitys() {
        return [
            {
                name: "Montreal",
                slug: "montreal",
            },
        ];
    }
}
