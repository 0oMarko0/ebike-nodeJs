import RestaurantRepo from "../data/repository/restaurant-repo";
import _ from "lodash";
import Point from "../model/geometry/point";
import { Restaurant, toFeaturePoints } from "../model/restaurant";
import { FeatureCollection } from "../model/feature-collection";

export default class RestaurantController {
    private restaurantRepo: RestaurantRepo;
    constructor(restaurantRepo: RestaurantRepo) {
        this.restaurantRepo = restaurantRepo;
    }

    async getRestaurantType() {
        const restaurantType: string[] = [];
        const result = await this.restaurantRepo.getRestaurantType();

        result.forEach((item) => {
            item._id.forEach((type: string) => {
                if (this.notInt(type, restaurantType)) {
                    restaurantType.push(type);
                }
            });
        });

        return restaurantType;
    }

    async getRestaurantNearAPoint(query: any) {
        if (!this.isQueryParamValid(query)) throw new Error("Missing required param: lat, lon, radius");
        const point: Point = new Point(query.lon, query.lat);

        const restaurants = await this.getRestaurant(point, query.radius, query);

        const featureCollection = new FeatureCollection();
        featureCollection.addFromList(toFeaturePoints(restaurants));
        return featureCollection.toModel;
    }

    async getRestaurant(point: Point, radius: any, query?: any): Promise<Restaurant[]> {
        const filter = this.buildFilter(query);
        return await this.restaurantRepo.getRestaurantNearAPoint(point, parseInt(radius), filter);
    }

    private isQueryParamValid(query: any) {
        return _.has(query, "lat") && _.has(query, "lon") && _.has(query, "radius");
    }

    private buildFilter(query: any) {
        return _.pickBy(query, (value, key) => this.notInt(key, ["lat", "lon", "radius"]));
    }

    private notInt(value: any, array: any[]) {
        let notInTheArray = true;
        array.forEach((element) => {
            if (element === value) {
                notInTheArray = false;
            }
        });

        return notInTheArray;
    }
}
