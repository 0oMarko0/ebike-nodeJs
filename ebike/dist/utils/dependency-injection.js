"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const registry_1 = __importDefault(require("./registry"));
const injectable_1 = require("./injectable");
const user_repo_1 = __importDefault(require("../data/repository/user-repo"));
const user_controller_1 = __importDefault(require("../controller/user-controller"));
const restaurant_controller_1 = __importDefault(require("../controller/restaurant-controller"));
const restaurant_repo_1 = __importDefault(require("../data/repository/restaurant-repo"));
const journey_repo_1 = __importDefault(require("../data/repository/journey-repo"));
const journey_controller_1 = __importDefault(require("../controller/journey-controller"));
const bike_path_1 = __importDefault(require("../data/repository/bike-path"));
const statistics_repo_1 = __importDefault(require("../data/repository/statistics-repo"));
const statistics_controller_1 = __importDefault(require("../controller/statistics-controller"));
class DependencyInjection {
    bootstrap() {
        this.initialiseRepository();
        this.initialiseController();
        logger_1.default.info("Bootstrapping dependency injection service");
    }
    initialiseRepository() {
        registry_1.default.register(injectable_1.Injectable.UserRepo, new user_repo_1.default());
        registry_1.default.register(injectable_1.Injectable.RestaurantRepo, new restaurant_repo_1.default());
        registry_1.default.register(injectable_1.Injectable.JourneyRepo, new journey_repo_1.default());
        registry_1.default.register(injectable_1.Injectable.BikePathRepo, new bike_path_1.default());
        registry_1.default.register(injectable_1.Injectable.StatisticsRepo, new statistics_repo_1.default());
    }
    initialiseController() {
        registry_1.default.register(injectable_1.Injectable.UserController, new user_controller_1.default(registry_1.default.resolve(injectable_1.Injectable.UserRepo)));
        registry_1.default.register(injectable_1.Injectable.RestaurantController, new restaurant_controller_1.default(registry_1.default.resolve(injectable_1.Injectable.RestaurantRepo)));
        registry_1.default.register(injectable_1.Injectable.JourneyController, new journey_controller_1.default(registry_1.default.resolve(injectable_1.Injectable.JourneyRepo), registry_1.default.resolve(injectable_1.Injectable.StatisticsRepo)));
        registry_1.default.register(injectable_1.Injectable.StatisticsController, new statistics_controller_1.default(registry_1.default.resolve(injectable_1.Injectable.StatisticsRepo)));
    }
}
exports.default = DependencyInjection;
//# sourceMappingURL=dependency-injection.js.map