"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const registry_1 = __importDefault(require("../utils/registry"));
const injectable_1 = require("../utils/injectable");
const router = express_1.default.Router();
router.get("/type", (req, res) => {
    const restaurantController = registry_1.default.resolve(injectable_1.Injectable.RestaurantController);
    res.send(restaurantController.getRestaurantType()).status(200);
});
exports.default = router;
//# sourceMappingURL=restaurant.js.map