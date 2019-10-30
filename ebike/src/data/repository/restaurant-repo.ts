import Repo from "./repo";
import collections from "../utils/mongoCollection";

export default class RestaurantRepo extends Repo {
    constructor() {
        super(collections.restaurant);
    }

    getRestaurantType() {
        return ["Italien", "thai", "fast-food"];
    }
}
