import Repo from "./repo";
import collections from "../utils/mongoCollection";
import Point from "../../model/geometry/point";

export default class JourneyRepo extends Repo {
    constructor() {
        super(collections.journey);
    }

    async findBikePathNearAPoint(point: Point, max: number, min: number) {
        const query = {
            geometry: {
                $nearSphere: {
                    $geometry: point.toGeometry,
                    $maxDistance: max,
                    $minDistance: min
                }
            }
        };

        return await this.getCollection().find(query).toArray();
    }
}
