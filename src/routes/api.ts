import express, { Request, Response } from "express";
import Registry from "../utils/registry";
import { Injectable } from "../utils/injectable";
import StatisticsController from "../controller/statistics-controller";
import AuthMiddleware from "../middleware/authentication";

const router = express.Router();

router.get("/statistics", AuthMiddleware, async (req: Request, res: Response) => {
    const statistics: StatisticsController = Registry.resolve(Injectable.StatisticsController);
    res.send(await statistics.getGlobalStatistics()).status(200);
});

export default router;
