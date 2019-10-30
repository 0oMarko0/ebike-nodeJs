"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const app_root_path_1 = __importDefault(require("app-root-path"));
const winston_1 = __importStar(require("winston"));
const { combine } = winston_1.default.format;
const loggerFormat = combine(winston_1.default.format.colorize(), winston_1.default.format.timestamp(), winston_1.default.format.align(), winston_1.default.format.printf(info => {
    const { timestamp, level, message } = info, args = __rest(info, ["timestamp", "level", "message"]);
    const ts = timestamp.slice(0, 19).replace("T", " ");
    return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ""}`;
}));
const options = {
    file: {
        filename: `${app_root_path_1.default}/logs/app.log`,
        handleExceptions: true,
        maxsize: 5242880,
        maxFiles: 5,
    },
    console: {
        format: loggerFormat,
    },
};
const logger = winston_1.default.createLogger({
    transports: [new winston_1.transports.File(options.file), new winston_1.transports.Console(options.console)],
    exitOnError: false,
});
let morganLoggingPolicy = "short";
if (process.env.NODE_ENV === "development") {
    morganLoggingPolicy = "dev";
}
const stream = {
    write: (message) => {
        logger.info(message);
    },
};
exports.morganLogger = morgan_1.default(morganLoggingPolicy, { stream });
exports.default = logger;
//# sourceMappingURL=logger.js.map