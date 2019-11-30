/* This file will include all the routes for the correction
as they appear in the tp description */
import express, { Request, Response } from "express";
import Registry from "../utils/registry";
import { Injectable } from "../utils/injectable";
import JourneyController from "../controller/journey-controller";
import logger from "../utils/logger";
import formatError from "../utils/error";
import RestaurantController from "../controller/restaurant-controller";

const router = express.Router();

router.get("/heartbeat", async (req: Request, res: Response) => {
    const journeyController: JourneyController = Registry.resolve(Injectable.JourneyController);
    try {
        res.send(await journeyController.getHeartBeat()).status(200);
    } catch (e) {
        logger.error(e.message);
        res.status(400).send(formatError(e.message, req, 400));
    }
});

router.get("/starting-point", async (req: Request, res: Response) => {
    const journeyController: JourneyController = Registry.resolve(Injectable.JourneyController);
    try {
        res.send(await journeyController.startingPointForCorrection(req.body));
    } catch (e) {
        logger.error(e.message);
        res.status(400).send(formatError(e.message, req, 400));
    }
});

router.get("/parcours", async (req: Request, res: Response) => {
    const journeyController: JourneyController = Registry.resolve(Injectable.JourneyController);
    try {
        res.send(await journeyController.journeyForCorrection(req.body));
    } catch (e) {
        logger.error(e.message);
        res.status(400).send(formatError(e.message, req, 400));
    }
});

router.get("/type", async (req: Request, res: Response) => {
    const restaurantController: RestaurantController = Registry.resolve(Injectable.RestaurantController);
    try {
        res.send(await restaurantController.getRestaurantType()).status(200);
    } catch (e) {
        logger.error(e.message);
        res.status(400).send(formatError(e.message, req, 400));
    }
});

export default router;
