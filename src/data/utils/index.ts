import MongoDB from "../database/mongo";
import collections from "./mongoCollection";

export const buildIndex = () => {
    MongoDB.getDb()
        .collection(collections.restaurant)
        .createIndex({ geometry: "2dsphere" });
};
