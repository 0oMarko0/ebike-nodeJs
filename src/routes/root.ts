import { Express } from "express";
import userRoute from "./user";
import apiRoute from "./api";
import restaurantRoute from "./restaurant";
import journeyRoute from "./journey";

const initRoute = (app: Express) => {
    app.use("/api", apiRoute);
    app.use("/restaurant", restaurantRoute);
    app.use("/journey", journeyRoute);
};

export default initRoute;
