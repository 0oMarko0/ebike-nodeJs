import RestaurantRepo from "../data/repository/restaurant-repo";
import GeoPoint from "../model/geo-point";
import _ from "lodash";

export default class RestaurantController {
    private restaurantRepo: RestaurantRepo;
    constructor(restaurantRepo: RestaurantRepo) {
        this.restaurantRepo = restaurantRepo;
    }

    getRestaurantType() {
        return this.restaurantRepo.getRestaurantType();
    }

    async getRestaurantNearAPoint(query: any) {
        if (!this.isQueryParamValid(query)) throw new Error("Missing required param: lat, lon, radius");
        const point: GeoPoint = new GeoPoint(query.lat, query.lon);

        return await this.restaurantRepo.getRestaurantNearAPoint(
            point,
            parseInt(query.radius),
            this.hasMoreParam(query) ? this.buildFilter(query) : undefined,
        );
    }

    private isQueryParamValid(query: any) {
        return _.has(query, "lat") && _.has(query, "lon") && _.has(query, "radius");
    }

    private hasMoreParam(query: any) {
        return Object.keys(query).length > 3;
    }

    private buildFilter(query: any) {
        return _.pickBy(query, (value, key) => this.notInt(key, ["lat", "lon", "radius"]));
    }

    private notInt(value: any, array: any[]) {
        let notInTheArray = true;
        array.forEach(element => {
            if (element === value) {
                notInTheArray = false;
            }
        });

        return notInTheArray;
    }
}
