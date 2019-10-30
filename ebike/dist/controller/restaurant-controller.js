"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RestaurantController {
    constructor(restaurantRepo) {
        this.restaurantRepo = restaurantRepo;
    }
    getRestaurantType() {
        return this.restaurantRepo.getRestaurantType();
    }
}
exports.default = RestaurantController;
//# sourceMappingURL=restaurant-controller.js.map