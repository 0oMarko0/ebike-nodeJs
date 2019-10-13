import BikePathSeed from "./bike-path-seed";
import BikePathRepo from "../repository/bike-path";
import JourneyRepo from "../repository/journey-repo";
import JourneySeed from "./journey-seed";
import Registry from "../../utils/registry";
import { Injectable } from "../../utils/injectable";

export default class Seed {
    private journeyRepo: JourneyRepo;
    private bikePathRepo: BikePathRepo;
    private repoToSeed: any[] = [];

    constructor() {
        this.bikePathRepo = Registry.resolve(Injectable.BikePathRepo);
        this.journeyRepo = Registry.resolve(Injectable.JourneyRepo);
        this.repoToSeed.push(new BikePathSeed(this.bikePathRepo));
        this.repoToSeed.push(new JourneySeed(this.journeyRepo));
    }

    start() {
        this.repoToSeed.forEach(repo => {
            repo.start();
        });
    }
}
