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
const logger_1 = __importDefault(require("../../utils/logger"));
const readFile_1 = __importDefault(require("./readFile"));
class RestaurantSeed extends readFile_1.default {
    constructor(restaurantRepo) {
        super();
        this.restaurantRepo = restaurantRepo;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const restaurants = this.readFromfile("sherbrooke_restaurant.json");
            yield this.restaurantRepo.drop();
            try {
                Object.values(restaurants).map((row) => __awaiter(this, void 0, void 0, function* () {
                    yield this.restaurantRepo.create(this.translate(row, "Sherbrooke"));
                }));
            }
            catch (e) {
                logger_1.default.error(e.message);
            }
            logger_1.default.info("SEEDING restaurant DONE");
        });
    }
    translate(row, city) {
        return {
            phone: row.phone,
            coordinates: [row.latitude, row.longitude],
            types: row.types,
            placeId: row.placeID,
            name: row.name,
            address: row.address.full,
        };
    }
}
exports.default = RestaurantSeed;
//# sourceMappingURL=restaurant-seed.js.map