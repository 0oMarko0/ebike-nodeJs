import StatisticsRepo from "../data/repository/statistics-repo";
import { meterToKilo } from "../utils/unitConversion";

export default class StatisticsController {
    private statisticsRepo: StatisticsRepo;

    constructor(statisticsRepo: StatisticsRepo) {
        this.statisticsRepo = statisticsRepo;
    }

    async getGlobalStatistics() {
        const { totalLength } = await this.statisticsRepo.getBikePathLength();
        return {
            nbRestaurants: await this.statisticsRepo.getNumberOfRestaurant(),
            totalPathLength: meterToKilo(totalLength),
        };
    }
}
