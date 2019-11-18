import Repo from "./repo";
import collections from "../utils/mongoCollection";
import GeoPoint from "../../model/geo-point";

export default class JourneyRepo extends Repo {
    constructor() {
        super(collections.journey);
    }

    async findBikePathNearAPoint(point: GeoPoint, max: number, min: number) {
        const query = {
            geometry: {
                $nearSphere: {
                    $geometry: point.toModel,
                    $maxDistance: max,
                    $minDistance: min
                }
            }
        };

        return await this.getCollection().find(query).toArray();
    }
}
