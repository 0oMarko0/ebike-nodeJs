import RestaurantRepo from "../repository/restaurant-repo";
import logger from "../../utils/logger";
import ReadFile from "./readFile";
import JourneyRepo from "../repository/journey-repo";

export default class JourneySeed extends ReadFile {
    private journeyRepo: JourneyRepo;
    constructor(journeyRepo: JourneyRepo) {
        super();
        this.journeyRepo = journeyRepo;
    }

    async start() {
        const {features} = this.readFromfile('sherbrooke_bike_path.geojson');
        await this.journeyRepo.drop();
        features.map(async (row: any) => {
            await this.journeyRepo.create(this.translate(row, "Sherbrooke"));
        });
        logger.info("SEEDING journey DONE");
    }

    private translate(row: any, city: string) {
        return {
            segmentLength: row.properties.Shape_Length,
            coating: row.properties.TYPEREVETEMENT,
            destination: row.properties.NOMDESTINATIONSHERBROOKE,
            city,
            created: row.created,
            geometry: row.geometry,
        };
    }
}
