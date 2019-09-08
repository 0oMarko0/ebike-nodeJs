/* eslint-disable @typescript-eslint/camelcase */
import express from "express";

const router = express.Router();

router.get("/heartbeat", (req, res) => {
    res.send({
        nb_restaurants: 121,
        total_path_length: 420,
    }).status(200);
});

router.get("/readme", (rew, res) => {
    res.send({
        documentation: "It should send api documentation",
    }).status(200);
});

export default router;
