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
const mongo_1 = __importDefault(require("../database/mongo"));
const mongoCollection_1 = __importDefault(require("../utils/mongoCollection"));
class StatisticsRepo {
    getBikePathLength() {
        return __awaiter(this, void 0, void 0, function* () {
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
            return this.getCollection(mongoCollection_1.default.journey)
                .aggregate(aggregate)
                .next();
        });
    }
    getActiveUser() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getCollection(mongoCollection_1.default.user)
                .find({ isActive: true })
                .count();
        });
    }
    getTotalUser() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getCollection(mongoCollection_1.default.user)
                .find()
                .count();
        });
    }
    getNumberOfRestaurant() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getCollection(mongoCollection_1.default.restaurant)
                .find()
                .count();
        });
    }
    getCollection(collection) {
        return mongo_1.default.getDb().collection(collection);
    }
}
exports.default = StatisticsRepo;
//# sourceMappingURL=statistics-repo.js.map