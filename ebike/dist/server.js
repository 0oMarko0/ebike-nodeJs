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
const app_1 = __importDefault(require("./app"));
const chalk_1 = __importDefault(require("chalk"));
const logger_1 = __importDefault(require("./utils/logger"));
const mongo_1 = __importDefault(require("./data/database/mongo"));
const dependency_injection_1 = __importDefault(require("./utils/dependency-injection"));
const seed_1 = __importDefault(require("./data/seed/seed"));
const dip = new dependency_injection_1.default();
const server = new Promise((resolve, reject) => {
    mongo_1.default.connect()
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        dip.bootstrap();
        const seed = new seed_1.default();
        yield seed.start();
        app_1.default.listen(app_1.default.get("port"), () => {
            logger_1.default.info(chalk_1.default.green(`App is running at http://localhost:${app_1.default.get("port")} in ${app_1.default.get("env")} mode`));
            logger_1.default.info(chalk_1.default.yellow("Press CTRL-C to stop"));
        });
        resolve();
    }))
        .catch(reject);
}).catch(e => logger_1.default.error(e));
exports.default = server;
//# sourceMappingURL=server.js.map