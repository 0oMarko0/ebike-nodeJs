import { Collection } from "mongodb";
import MongoDB from "../database/mongo";
import collections from "../utils/mongoCollection";

export default class StatisticsRepo {
    async getBikePathLength() {
        const aggregate = [
            {
                $group: {
                    _id: "",
                    totalLength: { $sum: "$segmentLength" },
                },
            },
            {
                $project: {
                    _id: 0,
                },
            },
        ];

        return this.getCollection(collections.journey)
            .aggregate(aggregate)
            .next();
    }

    async getNumberOfRestaurant(): Promise<number> {
        return this.getCollection(collections.restaurant)
            .find()
            .count();
    }

    private getCollection(collection: string): Collection {
        return MongoDB.getDb().collection(collection);
    }
}
