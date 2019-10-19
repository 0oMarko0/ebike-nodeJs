import logger from "./logger";
import Registry from "./registry";
import { Injectable } from "./injectable";

import UserRepo from "../data/repository/user-repo";
import UserController from "../controller/user-controller";
import RestaurantController from "../controller/restaurant-controller";
import RestaurantRepo from "../data/repository/restaurant-repo";
import JourneyRepo from "../data/repository/journey-repo";
import JourneyController from "../controller/journey-controller";
import BikePathRepo from "../data/repository/bike-path";

export default class DependencyInjection {
    bootstrap() {
        this.initialiseRepository();
        this.initialiseController();
        logger.info("Bootstrapping dependency injection service");
    }

    private initialiseRepository() {
        Registry.register(Injectable.UserRepo, new UserRepo());
        Registry.register(Injectable.RestaurantRepo, new RestaurantRepo());
        Registry.register(Injectable.JourneyRepo, new JourneyRepo());
        Registry.register(Injectable.BikePathRepo, new BikePathRepo());
    }

    private initialiseController() {
        Registry.register(Injectable.UserController, new UserController(Registry.resolve(Injectable.UserRepo)));
        Registry.register(
            Injectable.RestaurantController,
            new RestaurantController(Registry.resolve(Injectable.RestaurantRepo)),
        );
        Registry.register(
            Injectable.JourneyController,
            new JourneyController(Registry.resolve(Injectable.JourneyRepo)),
        );
    }
}
