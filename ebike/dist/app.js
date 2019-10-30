"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_root_path_1 = __importDefault(require("app-root-path"));
const express_1 = __importDefault(require("express"));
const registry_1 = __importDefault(require("./utils/registry"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const logger_1 = require("./utils/logger");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDocument = require('../docs/Ebike-1.0.0-swagger.json');
dotenv_1.config({ path: `${app_root_path_1.default}/.env` });
registry_1.default.initialise();
const root_1 = __importDefault(require("./routes/root"));
const error_1 = __importDefault(require("./utils/error"));
const app = express_1.default();
app.set("port", process.env.PORT || 4200);
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(logger_1.morganLogger);
app.use('/readme', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.send(error_1.default('Internal Server Error', req, error.status));
});
root_1.default(app);
exports.default = app;
//# sourceMappingURL=app.js.map