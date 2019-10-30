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
const logger_1 = __importDefault(require("../../utils/logger"));
exports.MONGO_URL = process.env.MONGO_URL;
exports.DATA_BASE_NAME = "ebike";
class MongoDB {
    static getDb() {
        return this.db;
    }
    static connect() {
        return __awaiter(this, void 0, void 0, function* () {
            this.client = yield mongodb_1.MongoClient.connect(exports.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
            this.db = this.client.db(exports.DATA_BASE_NAME);
            logger_1.default.info(`MONGO connected on ${exports.MONGO_URL}/${exports.DATA_BASE_NAME}`);
        });
    }
}
exports.default = MongoDB;
//# sourceMappingURL=mongo.js.map