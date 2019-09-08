import express from "express";

const router = express.Router();

router.get("/type", (req, res) => {
    res.send(["Italien", "Japonais", "Fast-Food"]).status(200);
});

export default router;
