import { Express } from "express";
import apiRoute from "./api";
import restaurantRoute from "./restaurant";
import journeyRoute from "./journey";
import correctionRoute from "./routeForCorrection";

const initRoute = (app: Express) => {
    app.use("/api", apiRoute);
    app.use("/restaurant", restaurantRoute);
    app.use("/journey", journeyRoute);
    app.use("/", correctionRoute);
};

export default initRoute;
