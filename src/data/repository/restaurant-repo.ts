import Repo from "./repo";
import collections from "../utils/mongoCollection";
import Point from "../../model/geometry/point";

export default class RestaurantRepo extends Repo {
    constructor() {
        super(collections.restaurant);
    }

    getRestaurantType() {
        return ["Italien", "thai", "fast-food"];
    }

    async getRestaurantNearAPoint(geoPoint: Point, maxDistance: number, filter?: any) {
        const query = {
            geometry: {
                $nearSphere: {
                    $geometry: geoPoint.toGeometry,
                    $maxDistance: maxDistance
                }
            }
        };

        if (filter) Object.assign(query, filter);

        return await this.getCollection().find(query).toArray();
    }
}
