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
const readFile_1 = __importDefault(require("./readFile"));
const logger_1 = __importDefault(require("../../utils/logger"));
class BikePathSeed extends readFile_1.default {
    constructor(bikePathRepo) {
        super();
        this.bikePathRepo = bikePathRepo;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const bikePath = this.readFromfile("sherbrooke_bike_path.geojson");
            yield this.bikePathRepo.drop();
            try {
                yield this.bikePathRepo.create(Object.assign(bikePath, { city: "Sherbrooke" }));
            }
            catch (e) {
                logger_1.default.error(e.message);
            }
            logger_1.default.info("SEEDING bike-path DONE");
        });
    }
}
exports.default = BikePathSeed;
//# sourceMappingURL=bike-path-seed.js.map