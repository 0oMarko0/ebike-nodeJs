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
class JourneySeed extends readFile_1.default {
    constructor(journeyRepo) {
        super();
        this.journeyRepo = journeyRepo;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const { features } = this.readFromfile("sherbrooke_bike_path.geojson");
            yield this.journeyRepo.drop();
            try {
                features.map((row) => __awaiter(this, void 0, void 0, function* () {
                    yield this.journeyRepo.create(this.translate(row, "Sherbrooke"));
                }));
            }
            catch (e) {
                logger_1.default.error(e.message);
            }
            logger_1.default.info("SEEDING journey DONE");
        });
    }
    translate(row, city) {
        return {
            segmentLength: row.properties.Shape_Length,
            coating: row.properties.TYPEREVETEMENT,
            destination: row.properties.NOMDESTINATIONSHERBROOKE,
            city,
            created: row.created,
            geometry: row.geometry,
        };
    }
}
exports.default = JourneySeed;
//# sourceMappingURL=journey-seed.js.map