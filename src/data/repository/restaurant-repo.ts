import Repo from "./repo";
import collections from "../utils/mongoCollection";
import Point from "../../model/geometry/point";
import logger from "../../utils/logger";

export default class RestaurantRepo extends Repo {
    constructor() {
        super(collections.restaurant);
    }

    async getRestaurantType() {
        const aggregation: any = [
            {
                $group: { _id: "$cuisine" },
            },
        ];

        return await this.getCollection()
            .aggregate(aggregation)
            .toArray();
    }

    async getRestaurantNearAPoint(geoPoint: Point, maxDistance: number, filter?: any) {
        const query = {
            geometry: {
                $nearSphere: {
                    $geometry: geoPoint.toGeometry,
                    $maxDistance: maxDistance,
                },
            },
        };

        if (filter) Object.assign(query, filter);

        return await this.getCollection()
            .find(query)
            .toArray();
    }
}
