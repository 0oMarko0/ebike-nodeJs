// update the Journey collection to include new field
// hasRestaurantNear: bool
// restaurants: restaurants[]

// List all bike line (journey)
// TODO: use mongo cursor for that -> batch processing

// for all journey do a #geoWithin
// db.restaurants.find( { location: { $geoWithin: { $geometry: neighborhood.geometry } } } )
// add those results to the journey
// update journey

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
            const toUpdate = Object.assign(doc, { hasRestaurant: true, restaurants: result });
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

    logger.info("TRANSFORMATION Done")
};
