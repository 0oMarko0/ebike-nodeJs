/* eslint-disable @typescript-eslint/camelcase */
import express from "express";
import JourneyController from "../controller/journey-controller";
import Registry from "../utils/registry";
import { Injectable } from "../utils/injectable";
import BikePathController from "../controller/bike-path-controller";
import AuthMiddleware from "../middleware/authentication";

const router = express.Router();

router.get("/starting-point", (req, res) => {
    const journeyController: JourneyController = Registry.resolve(Injectable.JourneyController);
    res.send({ starting_point: journeyController.startingPoint() }).status(200);
});

router.get("/citys", AuthMiddleware, (req, res) => {
    const journeyController: JourneyController = Registry.resolve(Injectable.JourneyController);
    res.send(journeyController.getCitys()).status(200);
});

router.get("/bike-path/:city", AuthMiddleware, async (req, res) => {
    const bikePathController: BikePathController = Registry.resolve(Injectable.BikePathController);
    res.send(await bikePathController.getBikePathForCity(req.params.city));
});

export default router;
