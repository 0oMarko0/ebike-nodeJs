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
const geo_point_1 = __importDefault(require("../model/geo-point"));
class JourneyController {
    constructor(journeyRepo, statisticsRepo) {
        this.journeyRepo = journeyRepo;
        this.statisticsRepo = statisticsRepo;
    }
    startingPoint() {
        return new geo_point_1.default(46.77656, -71.2718).toModel;
    }
    getHeartBeat() {
        return __awaiter(this, void 0, void 0, function* () {
            const { totalLength } = yield this.statisticsRepo.getBikePathLength();
            return {
                nb_restaurants: yield this.statisticsRepo.getNumberOfRestaurant(),
                total_path_length: totalLength,
            };
        });
    }
}
exports.default = JourneyController;
//# sourceMappingURL=journey-controller.js.map