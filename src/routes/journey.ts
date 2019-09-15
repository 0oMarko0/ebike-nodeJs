/* eslint-disable @typescript-eslint/camelcase */
import express from "express";
import GeoPoint from "../model/geo-point";

const router = express.Router();

router.get("/starting-point", (req, res) => {
    const startingPoint: GeoPoint = new GeoPoint(46.77656, -71.2718);
    res.send({ starting_point: startingPoint.toModel }).status(200);
});

export default router;
