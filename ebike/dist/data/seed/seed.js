"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bike_path_seed_1 = __importDefault(require("./bike-path-seed"));
const journey_seed_1 = __importDefault(require("./journey-seed"));
const registry_1 = __importDefault(require("../../utils/registry"));
const injectable_1 = require("../../utils/injectable");
const restaurant_seed_1 = __importDefault(require("./restaurant-seed"));
class Seed {
    constructor() {
        this.repoToSeed = [];
        this.bikePathRepo = registry_1.default.resolve(injectable_1.Injectable.BikePathRepo);
        this.journeyRepo = registry_1.default.resolve(injectable_1.Injectable.JourneyRepo);
        this.restaurantRepo = registry_1.default.resolve(injectable_1.Injectable.RestaurantRepo);
        this.repoToSeed.push(new bike_path_seed_1.default(this.bikePathRepo));
        this.repoToSeed.push(new journey_seed_1.default(this.journeyRepo));
        this.repoToSeed.push(new restaurant_seed_1.default(this.restaurantRepo));
    }
    start() {
        this.repoToSeed.forEach(repo => {
            repo.start();
        });
    }
}
exports.default = Seed;
//# sourceMappingURL=seed.js.map