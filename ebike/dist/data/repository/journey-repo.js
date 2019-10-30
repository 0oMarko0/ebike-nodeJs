"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repo_1 = __importDefault(require("./repo"));
const mongoCollection_1 = __importDefault(require("../utils/mongoCollection"));
class JourneyRepo extends repo_1.default {
    constructor() {
        super(mongoCollection_1.default.journey);
    }
}
exports.default = JourneyRepo;
//# sourceMappingURL=journey-repo.js.map