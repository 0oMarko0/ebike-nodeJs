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
const repo_1 = __importDefault(require("./repo"));
const mongoCollection_1 = __importDefault(require("../utils/mongoCollection"));
class UserRepo extends repo_1.default {
    constructor() {
        super(mongoCollection_1.default.user);
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                email,
            };
            const aggregate = [
                { $match: query },
                { $project: { _id: 0, id: "$_id", email: 1, isActive: 1, isAdmin: 1, password: 1 } },
            ];
            return this.getCollection()
                .aggregate(aggregate)
                .next();
        });
    }
}
exports.default = UserRepo;
//# sourceMappingURL=user-repo.js.map