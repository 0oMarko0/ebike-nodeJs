import Repo from "./repo";
import collections from "../utils/mongoCollection";

export default class BikePathRepo extends Repo {
    constructor() {
        super(collections.bikePath);
    }

    async getByCity(city: string) {
        return await this.getCollection()
            .find({ city })
            .next();
    }
}
