"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = __importDefault(require("../utils/logger"));
const error_1 = __importDefault(require("../utils/error"));
const AUTHORIZATION = "Authorization";
const AuthMiddleware = (req, res, next) => {
    const token = req.header(AUTHORIZATION);
    if (token) {
        try {
            req.user = jsonwebtoken_1.default.verify(token.split(" ")[1], process.env.JWT_SECRET);
        }
        catch (e) {
            logger_1.default.error(e.message);
            res.status(401).send(error_1.default("Authentication failed", req, 401));
        }
    }
    else {
        res.status(401).send(error_1.default("You need to be authenticated", req, 401));
    }
    next();
};
exports.default = AuthMiddleware;
//# sourceMappingURL=authentication.js.map