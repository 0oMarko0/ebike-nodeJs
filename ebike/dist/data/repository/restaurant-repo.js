"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repo_1 = __importDefault(require("./repo"));
const mongoCollection_1 = __importDefault(require("../utils/mongoCollection"));
class RestaurantRepo extends repo_1.default {
    constructor() {
        super(mongoCollection_1.default.restaurant);
    }
    getRestaurantType() {
        return ["Italien", "thai", "fast-food"];
    }
}
exports.default = RestaurantRepo;
//# sourceMappingURL=restaurant-repo.js.map