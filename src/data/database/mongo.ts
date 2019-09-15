import { Db, MongoClient } from "mongodb";
import logger from "../../utils/logger";

export const MONGO_URL = process.env.MOGO_URL;
export const DATA_BASE_NAME = "ebike";

export default class MongoDB {
    private static db: Db;
    private static client: MongoClient;

    static getDb() {
        return this.db;
    }

    static async connect() {
        this.client = await MongoClient.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        this.db = this.client.db(DATA_BASE_NAME);
        logger.info(`MONGO connected on ${MONGO_URL}/${DATA_BASE_NAME}`);
    }
}
