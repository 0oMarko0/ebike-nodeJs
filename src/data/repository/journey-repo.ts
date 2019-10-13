import Repo from "./repo";

export default class JourneyRepo extends Repo {
    constructor() {
        super("journey");
    }

    async getBikePathLength() {
        const aggregate = [{
            $group: {
                _id: '',
                totalLength: { $sum: 'segmentLength'}
            }
        }];

        return this.getCollection().aggregate(aggregate).next();
    }
}
