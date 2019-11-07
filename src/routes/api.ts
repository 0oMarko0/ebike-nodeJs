import express, { Request, Response } from "express";
import UserController from "../controller/user-controller";
import Registry from "../utils/registry";
import { Injectable } from "../utils/injectable";
import { check } from "express-validator";
import User from "../model/user";
import logger from "../utils/logger";
import StatisticsController from "../controller/statistics-controller";
import formatError from "../utils/error";
import AuthMiddleware from "../middleware/authentication";

const router = express.Router();

const toUser = (req: Request): User => {
    return {
        email: req.body.email,
        password: req.body.password,
    };
};

router.get("/statistics", AuthMiddleware, async (req, res) => {
    const statistics: StatisticsController = Registry.resolve(Injectable.StatisticsController);
    res.send(await statistics.getGlobalStatistics()).status(200);
});

router.post(
    "/signup",
    [
        check("email", "Must be a valid Email").isEmail(),
        check("password", "Must be longer than 6 character").isLength({ min: 6 }),
    ],
    async (req: Request, res: Response) => {
        const userController: UserController = Registry.resolve(Injectable.UserController);
        try {
            res.status(201).send(await userController.createNewUser(toUser(req)));
        } catch (e) {
            logger.error(e.message);
            res.status(412).send(formatError(e.message, req, 412));
        }
    },
);

router.post(
    "/signin",
    [
        check("email", "Must be a valid email").isEmail(),
        check("password", "Must be longer than 6 character").isLength({ min: 6 }),
    ],
    async (req: Request, res: Response) => {
        const userController: UserController = Registry.resolve(Injectable.UserController);
        try {
            res.status(200).send(await userController.signInUser(toUser(req)));
        } catch (e) {
            logger.error(e.message);
            res.status(400).send(formatError(e.message, req, 400));
        }
    },
);

router.post("/logout", AuthMiddleware, async (req: Request, res: Response) => {
    const userController: UserController = Registry.resolve(Injectable.UserController);
    res.status(200).send(await userController.logout(toUser(req)));
});
export default router;
