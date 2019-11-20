import JourneyRepo from "../data/repository/journey-repo";
import StatisticsRepo from "../data/repository/statistics-repo";
import BikePathRepo from "../data/repository/bike-path";
import Point, { PointGeometry } from "../model/geometry/point";
import PathFinding from "../utils/algo/PathFinding";

export default class JourneyController {
    private journeyRepo: JourneyRepo;
    private statisticsRepo: StatisticsRepo;
    private bikePathRepo: BikePathRepo;
    constructor(journeyRepo: JourneyRepo, statisticsRepo: StatisticsRepo, bikePathRepo: BikePathRepo) {
        this.journeyRepo = journeyRepo;
        this.statisticsRepo = statisticsRepo;
        this.bikePathRepo = bikePathRepo;
    }

    startingPoint(): PointGeometry {
        return new Point(46.77656, -71.2718).toGeometry;
    }

    // Algo
    // Validate that the restaurant type if valid if the section
    // 1. Build the local network
    //      1.1 validate that there restaurant type in that area ? -> or validate later ?
    // 2. find the nearest position the is a bike line
    // 3. find all finish position
    // 4. build all possible path -> may be quite expressive to do
    //      4.1 chose all those that respect the condition
    // 5. filter those that have the requirement

    async createAJourney(body: any) {
        const { latitude, longitude } = body.startingPoint.coordinates;
        const point = new Point(longitude, latitude);
        const maxDistance = body.maximumLength * 1.1;
        const minDistance = body.maximumLength * 0.9;
        const numberOfStop = body.numberOfStops;
        const type = body.type;

        const bikeLine = await this.journeyRepo.findBikePathNearAPoint(point, maxDistance, 0);
        const start = await this.journeyRepo.findBikePathNearAPoint(point, 250, 0);
        const result = await this.journeyRepo.findBikePathNearAPoint(point, maxDistance, minDistance);

        const pathFinding = new PathFinding(start, result, bikeLine);

        const path = pathFinding.findPath(pathFinding.start, pathFinding.finish);

        return pathFinding.findPathWithRestaurant(maxDistance, numberOfStop, type);
        // return pathFinding.findAllPossiblePath();
    }

    async getHeartBeat() {
        const { totalLength } = await this.statisticsRepo.getBikePathLength();
        return {
            nb_restaurants: await this.statisticsRepo.getNumberOfRestaurant(),
            total_path_length: totalLength,
        };
    }

    // TODO: Get from database
    getCitys() {
        return [
            {
                name: "Montreal",
                slug: "montreal",
            },
        ];
    }
}
