"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const registry_1 = __importDefault(require("../utils/registry"));
const injectable_1 = require("../utils/injectable");
const express_validator_1 = require("express-validator");
const logger_1 = __importDefault(require("../utils/logger"));
const error_1 = __importDefault(require("../utils/error"));
const router = express_1.default.Router();
const toUser = (req) => {
    return {
        email: req.body.email,
        password: req.body.password,
    };
};
router.get("/statistics", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const statistics = registry_1.default.resolve(injectable_1.Injectable.StatisticsController);
    res.send(yield statistics.getGlobalStatistics()).status(200);
}));
router.post("/signup", [
    express_validator_1.check("email", "Must be a valid Email").isEmail(),
    express_validator_1.check("password", "Must be longer than 6 character").isLength({ min: 6 }),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userController = registry_1.default.resolve(injectable_1.Injectable.UserController);
    try {
        res.status(201).send(yield userController.createNewUser(toUser(req)));
    }
    catch (e) {
        logger_1.default.error(e.message);
        res.status(412).send(error_1.default(e.message, req, 412));
    }
}));
router.post("/signin", [
    express_validator_1.check("email", "Must be a valid email").isEmail(),
    express_validator_1.check("password", "Must be longer than 6 character").isLength({ min: 6 }),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userController = registry_1.default.resolve(injectable_1.Injectable.UserController);
    try {
        res.status(200).send(yield userController.signInUser(toUser(req)));
    }
    catch (e) {
        logger_1.default.error(e.message);
        res.status(400).send(error_1.default(e.message, req, 400));
    }
}));
router.post("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userController = registry_1.default.resolve(injectable_1.Injectable.UserController);
    res.status(200).send(yield userController.logout(toUser(req)));
}));
exports.default = router;
//# sourceMappingURL=api.js.map