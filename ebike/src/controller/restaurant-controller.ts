import RestaurantRepo from "../data/repository/restaurant-repo";

export default class RestaurantController {
    private restaurantRepo: RestaurantRepo;
    constructor(restaurantRepo: RestaurantRepo) {
        this.restaurantRepo = restaurantRepo;
    }

    getRestaurantType() {
        return this.restaurantRepo.getRestaurantType();
    }
}
