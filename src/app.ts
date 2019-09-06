import express from "express";
import appRoot from "app-root-path";
import { config } from "dotenv";

config({ path: `${appRoot}/.env` });

import apiRoute from "./routes/api";
import { morganLogger } from "./utils/logger";

const app = express();

app.set("port", process.env.PORT || 4200);

app.use(morganLogger);

app.use("/api", apiRoute);

export default app;
