/* This file will include all the routes for the correction
as they appear in the tp description */
import express from "express";
import Registry from "../utils/registry";
import { Injectable } from "../utils/injectable";
import JourneyController from "../controller/journey-controller";

const router = express.Router();

router.get("/heartbeat", async (req, res) => {
    const restaurantController: JourneyController = Registry.resolve(Injectable.JourneyController);
    res.send(await restaurantController.getHeartBeat()).status(200);
});

export default router;
