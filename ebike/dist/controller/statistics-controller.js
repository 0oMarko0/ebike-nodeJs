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
Object.defineProperty(exports, "__esModule", { value: true });
const unitConversion_1 = require("../utils/unitConversion");
class StatisticsController {
    constructor(statisticsRepo) {
        this.statisticsRepo = statisticsRepo;
    }
    getGlobalStatistics() {
        return __awaiter(this, void 0, void 0, function* () {
            const { totalLength } = yield this.statisticsRepo.getBikePathLength();
            return {
                nbRestaurants: yield this.statisticsRepo.getNumberOfRestaurant(),
                totalPathLength: unitConversion_1.meterToKilo(totalLength),
                userConnected: yield this.statisticsRepo.getActiveUser(),
                totalUser: yield this.statisticsRepo.getTotalUser(),
            };
        });
    }
}
exports.default = StatisticsController;
//# sourceMappingURL=statistics-controller.js.map