"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/camelcase */
const express_1 = __importDefault(require("express"));
const registry_1 = __importDefault(require("../utils/registry"));
const injectable_1 = require("../utils/injectable");
const router = express_1.default.Router();
router.get("/starting-point", (req, res) => {
    const journeyController = registry_1.default.resolve(injectable_1.Injectable.JourneyController);
    res.send({ starting_point: journeyController.startingPoint() }).status(200);
});
exports.default = router;
//# sourceMappingURL=journey.js.map