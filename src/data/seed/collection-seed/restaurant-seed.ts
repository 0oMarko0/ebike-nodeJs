import logger from "../../../utils/logger";
import ReadFile from "../../../utils/readFile";
import RestaurantRepo from "../../repository/restaurant-repo";
import _ from "lodash";

export default class RestaurantSeed extends ReadFile {
    private restaurantRepo: RestaurantRepo;
    constructor(restaurantRepo: RestaurantRepo) {
        super();
        this.restaurantRepo = restaurantRepo;
    }

    async start() {
        const file = this.readFromfile("./seeding-data/montreal-restaurant.json");
        const restaurants = file.elements;
        await this.restaurantRepo.drop();
        try {
            Object.values(restaurants).map(async (document: any) => {
                if (this.documentIsValid(document)) {
                    const translated = this.translate(document);
                    await this.restaurantRepo.create(translated);
                }
            });
        } catch (e) {
            logger.error(e.message);
        }
        logger.info("SEEDING restaurant DONE");
    }

    cleanAddress = (addr: string) => {
        if (addr.includes("addr")) {
            return addr.split(":")[1];
        }
    };

    private documentIsValid(document: any): boolean {
        const isvalid =
            _.has(document, "lat") &&
            _.has(document, "lon") &&
            _.has(document, "tags.cuisine") &&
            _.has(document, "tags.name");

        return isvalid;
    }

    private translate(row: any) {
        let address: any = {};
        for (let key in row.tags) {
            if (key.includes("addr")) {
                address[this.cleanAddress(key)] = row.tags[key];
                Object.assign(row, { address });
                delete row.tags[key];
            } else {
                row[key] = row.tags[key];
                delete row.tags[key];
            }
        }

        const geometry = {
            type: "Point",
        };

        const coordinates = [];
        coordinates.push(row.lon);
        coordinates.push(row.lat);
        Object.assign(geometry, { coordinates });
        Object.assign(row, { geometry });
        Object.assign(row, { cuisine: this.restaurantType(row.cuisine) });
        Object.assign(row, { cote: this.score() });

        delete row.tags;
        delete row.id;
        delete row.type;
        delete row.lat;
        delete row.lon;
        delete row.amenity;

        return row;
    }

    private restaurantType(restaurant: string) {
        let types = [];

        if (restaurant.includes(";")) {
            types = restaurant.split(";");
        } else if (restaurant.includes("_+_")) {
            types = restaurant.split("_+_");
        } else if (restaurant.includes(",_")) {
            types = restaurant.split(",_");
        } else {
            types.push(restaurant);
        }

        return types;
    }

    private score() {
        return Math.floor(Math.random() * 5) + 1;
    }
}
