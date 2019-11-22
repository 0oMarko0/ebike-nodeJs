import express, { Request, Response } from "express";
import RestaurantController from "../controller/restaurant-controller";
import Registry from "../utils/registry";
import { Injectable } from "../utils/injectable";
import logger from "../utils/logger";
import formatError from "../utils/error";

const router = express.Router();

router.get("/type", (req: Request, res: Response) => {
    const restaurantController: RestaurantController = Registry.resolve(Injectable.RestaurantController);
    res.send(restaurantController.getRestaurantType()).status(200);
});

router.get("/near", async (req: Request, res: Response) => {
    const restaurantController: RestaurantController = Registry.resolve(Injectable.RestaurantController);
    try {
        res.send(await restaurantController.getRestaurantNearAPoint(req.query)).status(200);
    } catch (e) {
        logger.error(e.message);
        res.status(400).send(formatError(e.message, req, 400));
    }
});

export default router;
