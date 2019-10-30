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

        const aggregate = [
            { $match: query },
            { $project: { _id: 0, id: "$_id", email: 1, isActive: 1, isAdmin: 1, password: 1 } },
        ];

        return this.getCollection()
            .aggregate(aggregate)
            .next();
    }
}
