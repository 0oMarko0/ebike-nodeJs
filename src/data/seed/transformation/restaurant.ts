// update the Journey collection to include new field
// hasRestaurantNear: bool
// restaurants: restaurants[]

import MongoDB from "../../database/mongo";
import collections from "../../utils/mongoCollection";
import logger from "../../../utils/logger";

export const transformation = async () => {
    logger.info("TRANSFORMATION - Begin");
    const cursor = MongoDB.getDb()
        .collection(collections.journey)
        .find()
        .batchSize(100);

    while (await cursor.hasNext()) {
        const doc = await cursor.next();
        const result = await MongoDB.getDb()
            .collection(collections.restaurant)
            .find({
                geometry: {
                    $geoWithin: {
                        $geometry: doc.polygon,
                    },
                },
            })
            .toArray();

        if (result.length > 0) {
            await MongoDB.getDb()
                .collection(collections.journey)
                .updateOne(
                    { _id: doc._id },
                    {
                        $set: {
                            hasRestaurants: true,
                            restaurants: result,
                        },
                    },
                );
        } else {
            await MongoDB.getDb()
                .collection(collections.journey)
                .updateOne(
                    { _id: doc._id },
                    {
                        $set: {
                            hasRestaurants: false,
                        },
                    },
                );
        }
    }

    logger.info("TRANSFORMATION Done");
};
