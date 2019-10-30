import Repo from "./repo";
import collections from "../utils/mongoCollection";

export default class JourneyRepo extends Repo {
    constructor() {
        super(collections.journey);
    }
}
