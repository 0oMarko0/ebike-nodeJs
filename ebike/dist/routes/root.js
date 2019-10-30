"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = __importDefault(require("./api"));
const restaurant_1 = __importDefault(require("./restaurant"));
const journey_1 = __importDefault(require("./journey"));
const routeForCorrection_1 = __importDefault(require("./routeForCorrection"));
const initRoute = (app) => {
    app.use("/api", api_1.default);
    app.use("/restaurant", restaurant_1.default);
    app.use("/journey", journey_1.default);
    app.use("/", routeForCorrection_1.default);
};
exports.default = initRoute;
//# sourceMappingURL=root.js.map