import Repo from "./repo";

export default class RestaurantRepo extends Repo {
    constructor() {
        super("restaurant");
    }

    getRestaurantType() {
        return ["Italien", "thai", "fast-food"];
    }
}
