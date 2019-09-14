import Repo from "./repo";

export default class UserRepo extends Repo {
    constructor() {
        super("user");
    }

    async getByEmail(email: string) {
        const query = {
            email,
        };

        const aggregate = [{ $match: query }];

        return this.getCollection().aggregate(aggregate).next();
    }
}
