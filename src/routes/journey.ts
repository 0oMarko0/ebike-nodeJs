/* eslint-disable @typescript-eslint/camelcase */
import express, { Request, Response } from "express";
import JourneyController from "../controller/journey-controller";
import Registry from "../utils/registry";
import { Injectable } from "../utils/injectable";
import BikePathController from "../controller/bike-path-controller";
import logger from "../utils/logger";
import formatError from "../utils/error";

const router = express.Router();

router.get("/starting-point", async (req: Request, res: Response) => {
    const journeyController: JourneyController = Registry.resolve(Injectable.JourneyController);
    try {
        res.send(await journeyController.startingPointForCorrection(req.body)).status(200);
    } catch (e) {
        logger.error(e.message);
        res.status(400).send(formatError(e.message, req, 400));
    }
});

router.get("/citys", (req: Request, res: Response) => {
    const journeyController: JourneyController = Registry.resolve(Injectable.JourneyController);
    res.send(journeyController.getCitys()).status(200);
});

router.get("/bike-path/:city", async (req: Request, res: Response) => {
    const bikePathController: BikePathController = Registry.resolve(Injectable.BikePathController);
    res.send(await bikePathController.getBikePathForCity(req.params.city));
});

router.post("/", async (req: Request, res: Response) => {
    const journeyController: JourneyController = Registry.resolve(Injectable.JourneyController);
    try {
        res.send(await journeyController.createAJourney(req.body));
    } catch (e) {
        logger.error(e.message);
        res.status(400).send(formatError(e.message, req, 400));
    }
});

export default router;
