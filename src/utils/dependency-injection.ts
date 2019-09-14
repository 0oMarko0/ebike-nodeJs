import logger from "./logger";
import Registry from "./registry";
import { Injectable } from "./injectable";

import UserRepo from "../data/repository/user-repo";
import UserController from "../controller/user-controller";

export default class DependencyInjection {
    bootstrap() {
        this.initialiseRepository();
        this.initialiseController();
        logger.info("Bootstrapping dependency injection service");
    }

    private initialiseRepository() {
        Registry.register(Injectable.UserRepo, new UserRepo());
    }

    private initialiseController() {
        Registry.register(Injectable.UserController, new UserController(Registry.resolve(Injectable.UserRepo)));
    }
}
