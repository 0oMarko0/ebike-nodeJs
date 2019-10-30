"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongo_1 = __importDefault(require("../database/mongo"));
const lodash_1 = __importDefault(require("lodash"));
const moment = require("moment");
const logger_1 = __importDefault(require("../../utils/logger"));
class Repo {
    constructor(collection) {
        this.collection = mongo_1.default.getDb().collection(collection);
    }
    getCollection() {
        return this.collection;
    }
    create(document) {
        return __awaiter(this, void 0, void 0, function* () {
            Object.assign(document, { created: moment().unix() });
            const result = yield this.collection.insertOne(document);
            if (!result.insertedId)
                throw new Error(`Unable to insert document ${document}`);
            return result.insertedId.toString();
        });
    }
    getById(id, projection, customAggregation) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = { _id: this.toObjectId(id) };
            const aggregation = [
                {
                    $match: query,
                },
            ];
            if (lodash_1.default.isArray(customAggregation) && !lodash_1.default.isEmpty(customAggregation)) {
                aggregation.push(...customAggregation);
            }
            if (projection) {
                aggregation.push({ $project: projection });
            }
            return this.collection.aggregate(aggregation).next();
        });
    }
    update(id, document) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = { _id: this.toObjectId(id) };
            Object.assign(document, { updated: moment().unix() });
            const update = {
                $set: this.stripDocument(document),
            };
            const result = yield this.collection.updateOne(query, update);
            if (result.matchedCount === 0)
                throw new Error(`Unable to update document: ${document}`);
            return this.toObjectId(id);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = { _id: this.toObjectId(id) };
            const result = yield this.collection.deleteOne(query);
            if (result.deletedCount === 0)
                throw new Error(`Unable to delete document with id: ${id}`);
        });
    }
    drop() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.collection.drop();
            }
            catch (e) {
                logger_1.default.error(`Mongo Error: ${e.codeName}`);
            }
        });
    }
    toObjectId(id) {
        if (lodash_1.default.isString(id) && mongodb_1.ObjectId.isValid(id)) {
            return new mongodb_1.ObjectId(id);
        }
        return id;
    }
    stripDocument(document) {
        if (lodash_1.default.has(document, 'id'))
            delete document["id"];
        if (lodash_1.default.has(document, '_id'))
            delete document["_id"];
        return document;
    }
}
exports.default = Repo;
//# sourceMappingURL=repo.js.map