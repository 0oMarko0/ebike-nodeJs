import ReadFile from "./readFile";
import BikePathRepo from "../repository/bike-path";
import logger from "../../utils/logger";

export default class BikePathSeed extends ReadFile {
    private bikePathRepo: BikePathRepo;
    constructor(bikePathRepo: BikePathRepo) {
        super();
        this.bikePathRepo = bikePathRepo;
    }

    async start() {
        const bikePath = this.readFromfile("sherbrooke_bike_path.geojson");
        await this.bikePathRepo.drop();
        await this.bikePathRepo.create(Object.assign(bikePath, { city: "Sherbrooke" }));
        logger.info("SEEDING bike-path DONE");
    }
}
