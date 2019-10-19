import Repo from "./repo";
import collections from "../utils/mongoCollection";

export default class BikePathRepo extends Repo {
  constructor() {
    super(collections.bikePath);
  }
}
