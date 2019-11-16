/* eslint-disable @typescript-eslint/camelcase */
import express, { Request, Response } from "express";
import JourneyController from "../controller/journey-controller";
import Registry from "../utils/registry";
import { Injectable } from "../utils/injectable";
import BikePathController from "../controller/bike-path-controller";
import AuthMiddleware from "../middleware/authentication";

const router = express.Router();

router.get("/starting-point", (req: Request, res: Response) => {
    const journeyController: JourneyController = Registry.resolve(Injectable.JourneyController);
    res.send({ starting_point: journeyController.startingPoint() }).status(200);
});

router.get("/citys", AuthMiddleware, (req: Request, res: Response) => {
    const journeyController: JourneyController = Registry.resolve(Injectable.JourneyController);
    res.send(journeyController.getCitys()).status(200);
});

router.get("/bike-path/:city", AuthMiddleware, async (req: Request, res: Response) => {
    const bikePathController: BikePathController = Registry.resolve(Injectable.BikePathController);
    res.send(await bikePathController.getBikePathForCity(req.params.city));
});

router.post("/", AuthMiddleware, async (req: Request, res: Response) => {
    const journeyController: JourneyController = Registry.resolve(Injectable.JourneyController);
    res.send(journeyController.createAJourney(req.body));
});

export default router;
