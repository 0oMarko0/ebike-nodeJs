import express from "express";
import RestaurantController from "../controller/restaurant-controller";
import Registry from "../utils/registry";
import { Injectable } from "../utils/injectable";

const router = express.Router();

router.get("/type", (req, res) => {
    const restaurantController: RestaurantController = Registry.resolve(Injectable.RestaurantController);
    res.send(restaurantController.getRestaurantType()).status(200);
});

export default router;
