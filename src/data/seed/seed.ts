import BikePathSeed from "./collection-seed/bike-path-seed";
import BikePathRepo from "../repository/bike-path";
import JourneyRepo from "../repository/journey-repo";
import JourneySeed from "./collection-seed/journey-seed";
import Registry from "../../utils/registry";
import { Injectable } from "../../utils/injectable";
import RestaurantSeed from "./collection-seed/restaurant-seed";
import RestaurantRepo from "../repository/restaurant-repo";

export default class Seed {
    private readonly journeyRepo: JourneyRepo;
    private readonly bikePathRepo: BikePathRepo;
    private readonly restaurantRepo: RestaurantRepo;
    private repoToSeed: any[] = [];

    constructor() {
        this.bikePathRepo = Registry.resolve(Injectable.BikePathRepo);
        this.journeyRepo = Registry.resolve(Injectable.JourneyRepo);
        this.restaurantRepo = Registry.resolve(Injectable.RestaurantRepo);

        this.repoToSeed.push(new BikePathSeed(this.bikePathRepo));
        this.repoToSeed.push(new JourneySeed(this.journeyRepo));
        this.repoToSeed.push(new RestaurantSeed(this.restaurantRepo));
    }

    start = async () => {
        return Promise.all(
            this.repoToSeed.map(async repo => {
                await repo.start();
            }),
        );
    };
}
