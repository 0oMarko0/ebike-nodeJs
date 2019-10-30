/* eslint-disable @typescript-eslint/camelcase */
import express from "express";
import JourneyController from "../controller/journey-controller";
import Registry from "../utils/registry";
import { Injectable } from "../utils/injectable";

const router = express.Router();

router.get("/starting-point", (req, res) => {
    const journeyController: JourneyController = Registry.resolve(Injectable.JourneyController);
    res.send({ starting_point: journeyController.startingPoint() }).status(200);
});

export default router;
