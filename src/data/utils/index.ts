import MongoDB from "../database/mongo";
import collections from "./mongoCollection";
import logger from "../../utils/logger";

export const buildIndex = async () => {
    try {
        await MongoDB.getDb()
            .collection(collections.restaurant)
            .createIndex({ geometry: "2dsphere" });
        logger.info(`INDEX ${collections.restaurant}-geometry created`);

        await MongoDB.getDb()
            .collection(collections.journey)
            .createIndex({ geometry: "2dsphere" });
        logger.info(`INDEX ${collections.journey}-geometry created`);

        await MongoDB.getDb()
            .collection(collections.journey)
            .createIndex({ polygon: "2dsphere" });
        logger.info(`INDEX ${collections.journey}-polygon created`);
    } catch (e) {
        logger.error(`Unable to create Index: ${e}`);
    }
};
