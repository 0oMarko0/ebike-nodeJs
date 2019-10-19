/* This file will include all the routes for the correction
as they appear in the tp description */
import express from "express";

const router = express.Router();

router.get("/heartbeat", (req, res) => {
    res.send({
        nb_restaurants: 121,
        total_path_length: 420,
    }).status(200);
});

export default router;
