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
        const restaurants = this.readFromfile("sherbrooke_restaurant.json");
        await this.restaurantRepo.drop();
        try {
            Object.values(restaurants).map(async (row: any) => {
                await this.restaurantRepo.create(this.translate(row, "Sherbrooke"));
            });
        } catch (e) {
            logger.error(e.message);
        }
        logger.info("SEEDING restaurant DONE");
    }

    private translate(row: any, city: string) {
        return {
            phone: row.phone,
            coordinates: [row.latitude, row.longitude],
            types: row.types,
            placeId: row.placeID,
            name: row.name,
            address: row.address.full,
        };
    }
}
