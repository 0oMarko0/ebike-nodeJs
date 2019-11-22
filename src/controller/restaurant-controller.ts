import RestaurantRepo from "../data/repository/restaurant-repo";
import _ from "lodash";
import Point from "../model/geometry/point";
import { toFeaturePoints } from "../model/restaurant";
import { FeatureCollection } from "../model/feature-collection";

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
        const point: Point = new Point(query.lon, query.lat);

        const restaurants = await this.getRestaurant(point, query.radius, query);

        const featureCollection = new FeatureCollection();
        featureCollection.addFromList(toFeaturePoints(restaurants));
        return featureCollection.toModel;
    }

    async getRestaurant(point: Point, radius: any, query?: any) {
        const filter = this.buildFilter(query);
        return await this.restaurantRepo.getRestaurantNearAPoint(point, parseInt(radius), filter);
    }

    private isQueryParamValid(query: any) {
        return _.has(query, "lat") && _.has(query, "lon") && _.has(query, "radius");
    }

    private hasMoreParam(query: any) {
        return query && Object.keys(query).length > 3;
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
