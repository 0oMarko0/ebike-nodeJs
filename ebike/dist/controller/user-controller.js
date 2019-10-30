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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    signInUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const retrievedUser = yield this.userRepo.getByEmail(user.email);
            if (retrievedUser && bcryptjs_1.default.compareSync(user.password, retrievedUser.password)) {
                retrievedUser.isActive = true;
                yield this.userRepo.update(retrievedUser.id, retrievedUser);
                return this.createToken(user);
            }
            else {
                throw new Error("The password or the email are invalid");
            }
        });
    }
    createNewUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.userRepo.getByEmail(user.email)) {
                throw new Error("Email already in use");
            }
            user.password = bcryptjs_1.default.hashSync(user.password, 10);
            user.isAdmin = false;
            user.isActive = true;
            user.id = yield this.userRepo.create(user);
            return this.createToken(user);
        });
    }
    logout(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const retrievedUser = yield this.userRepo.getByEmail(user.email);
            retrievedUser.isActive = false;
            return yield this.userRepo.update(retrievedUser.id, retrievedUser);
        });
    }
    createToken(user) {
        return {
            token: jsonwebtoken_1.default.sign({
                email: user.email,
                isAdmin: user.isAdmin,
                id: user.id,
            }, process.env.JWT_SECRET),
        };
    }
}
exports.default = UserController;
//# sourceMappingURL=user-controller.js.map