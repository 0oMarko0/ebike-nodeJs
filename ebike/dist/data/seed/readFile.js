"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const app_root_path_1 = __importDefault(require("app-root-path"));
const fs = require("fs");
const BASE_PATH = path.join(`${app_root_path_1.default}`, "src", "data", "seed");
class ReadFile {
    readFromfile(file) {
        const rawData = fs.readFileSync(path.join(BASE_PATH, file));
        return JSON.parse(rawData);
    }
}
exports.default = ReadFile;
//# sourceMappingURL=readFile.js.map