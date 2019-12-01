import StatisticsRepo from "../data/repository/statistics-repo";
import { meterToKilo } from "../utils/unitConversion";
import UserRepo from "../data/repository/user-repo";

export default class StatisticsController {
    private statisticsRepo: StatisticsRepo;
    private userRepo: UserRepo;

    constructor(statisticsRepo: StatisticsRepo, userRepo: UserRepo) {
        this.statisticsRepo = statisticsRepo;
        this.userRepo = userRepo;
    }

    async getGlobalStatistics() {
        const { totalLength } = await this.statisticsRepo.getBikePathLength();
        return {
            nbRestaurants: await this.statisticsRepo.getNumberOfRestaurant(),
            totalPathLength: meterToKilo(totalLength),
            userConnected: await this.userRepo.getActiveUser(),
            totalUser: await this.userRepo.getTotalUser(),
        };
    }
}
