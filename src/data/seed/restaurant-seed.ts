import logger from "../../utils/logger";
import ReadFile from "./readFile";
import RestaurantRepo from "../repository/restaurant-repo";

export default class RestaurantSeed extends ReadFile {
    private restaurantRepo: RestaurantRepo;
    constructor(restaurantRepo: RestaurantRepo) {
        super();
        this.restaurantRepo = restaurantRepo;
    }

    async start() {
        const { features } = this.readFromfile("sherbrooke_restaurant.json");
        await this.restaurantRepo.drop();
        features.map(async (row: any) => {
            await this.restaurantRepo.create(this.translate(row, "Sherbrooke"));
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
