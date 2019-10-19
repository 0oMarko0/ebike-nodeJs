import Repo from "./repo";
import collections from "../utils/mongoCollection";

export default class UserRepo extends Repo {
    constructor() {
        super(collections.user);
    }

    async getByEmail(email: string) {
        const query = {
            email,
        };

        const aggregate = [{ $match: query }];

        return this.getCollection()
            .aggregate(aggregate)
            .next();
    }
}
