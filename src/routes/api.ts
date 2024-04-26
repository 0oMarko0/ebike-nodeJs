import express, { Request, Response } from "express";
import Registry from "../utils/registry";
import { Injectable } from "../utils/injectable";
import StatisticsController from "../controller/statistics-controller";

const router = express.Router();

router.get("/statistics", async (req: Request, res: Response) => {
    const statistics: StatisticsController = Registry.resolve(Injectable.StatisticsController);
    res.send(await statistics.getGlobalStatistics()).status(200);
});

export default router;
