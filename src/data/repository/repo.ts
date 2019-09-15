import { Collection, ObjectId } from "mongodb";
import MongoDB from "../database/mongo";
import _ from "lodash";
import moment = require("moment");

export default class Repo {
    private collection: Collection;

    constructor(collection: string) {
        this.collection = MongoDB.getDb().collection(collection);
    }

    getCollection(): Collection {
        return this.collection;
    }

    async create(document: any): Promise<string> {
        Object.assign(document, { created: moment().unix() });
        const result = await this.collection.insertOne(document);
        if (!result.insertedId) throw new Error(`Unable to insert document ${document}`);

        return result.insertedId.toString();
    }

    async getById(id: string, projection?: any, customAggregation?: any) {
        const query = { _id: this.toObjectId(id) };

        const aggregation = [
            {
                $match: query,
            },
        ];

        if (_.isArray(customAggregation) && !_.isEmpty(customAggregation)) {
            aggregation.push(...customAggregation);
        }

        if (projection) {
            // @ts-ignore
            aggregation.push({ $project: projection });
        }
        return this.collection.aggregate(aggregation).next();
    }

    async update(id: string, document: any): Promise<ObjectId> {
        const query = { _id: this.toObjectId(id) };
        Object.assign(document, { updated: moment().unix() });
        const update = {
            $set: document,
        };

        const result = await this.collection.updateOne(query, update);
        if (result.matchedCount === 0) throw new Error(`Unable to update document: ${document}`);

        return result.upsertedId._id;
    }

    async delete(id: string) {
        const query = { _id: this.toObjectId(id) };
        const result = await this.collection.deleteOne(query);
        if (result.deletedCount === 0) throw new Error(`Unable to delete document with id: ${id}`);
    }

    private toObjectId(id: string): ObjectId {
        if (_.isString(id) && ObjectId.isValid(id)) return new ObjectId(id);
    }
}
