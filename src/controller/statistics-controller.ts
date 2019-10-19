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
            nbRestaurants: 45,
            totalPathLength: meterToKilo(totalLength),
            userConnected: await this.statisticsRepo.getActiveUser(),
            totalUser: await this.statisticsRepo.getTotalUser(),
        };
    }
}
