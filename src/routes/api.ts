/* eslint-disable @typescript-eslint/camelcase */
import express, { Request, Response } from "express";
import UserController from "../controller/user-controller";
import Registry from "../utils/registry";
import { Injectable } from "../utils/injectable";
import { check } from "express-validator";
import User from "../model/user";
import logger from "../utils/logger";

const router = express.Router();

const toUser = (req: Request): User => {
    return {
        email: req.body.email,
        password: req.body.password,
    };
};

router.get("/heartbeat", async (req, res) => {
    const journeyController = Registry.resolve(Injectable.JourneyController);
    const test = await journeyController.getBikePathLength();
    res.send({
        nb_restaurants: 121,
        total_path_length: 420,
    }).status(200);
});

router.get("/readme", (req, res) => {
    res.send({
        documentation: "It should send api documentation",
    }).status(200);
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
            res.status(412).send(e.message);
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
            res.status(400).send(e.message);
        }
    },
);

export default router;
