import * as path from "path";
import appRoot from "app-root-path";
const fs = require("fs");

const BASE_PATH = path.join(`${appRoot}`, "src", "data", "seed");

export default class ReadFile {
    readFromfile(file: string) {
        const rawData = fs.readFileSync(path.join(BASE_PATH, file));
        return JSON.parse(rawData);
    }
}
