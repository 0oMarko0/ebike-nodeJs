import ReadFile from "./readFile";
import BikePathRepo from "../repository/bike-path";
import logger from "../../utils/logger";
import { log } from "util";

export default class BikePathSeed extends ReadFile {
    private bikePathRepo: BikePathRepo;
    constructor(bikePathRepo: BikePathRepo) {
        super();
        this.bikePathRepo = bikePathRepo;
    }

    async start() {
        const bikePath = this.readFromfile("montreal-bike-path.geojson");
        await this.bikePathRepo.drop();
        try {
            await this.bikePathRepo.create(Object.assign(bikePath, { city: "montreal" }));
        } catch (e) {
            logger.error(e.message);
        }
        logger.info("SEEDING bike-path DONE");
    }
}
