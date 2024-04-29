import appRoot from "app-root-path";
import Express, { Request, Response, NextFunction } from "express";
import Registry from "./utils/registry";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import { morganLogger } from "./utils/logger";
import swaggerUiExpress from "swagger-ui-express";
const swaggerDocument = require("../docs/Ebike-1.0.0-swagger.json");

config({ path: `${appRoot}/.env` });
Registry.initialise();

import initRoute from "./routes/root";
import formatError from "./utils/error";

const app = Express();

app.set("port", process.env.PORT || 4200);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morganLogger);
app.use("/readme", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocument));

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    res.status(error.status || 500);
    // @ts-ignore
    res.send(formatError("Internal Server Error", req, error.status));
});

initRoute(app);

export default app;
