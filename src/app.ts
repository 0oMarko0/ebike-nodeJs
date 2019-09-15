import appRoot from "app-root-path";
import Express, { Request, Response, NextFunction } from "express";
import Registry from "./utils/registry";
import bodyParser from "body-parser";
import { config } from "dotenv";
import { morganLogger } from "./utils/logger";

config({ path: `${appRoot}/.env` });
Registry.initialise();

import initRoute from "./routes/root";

const app = Express();

app.set("port", process.env.PORT || 4200);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morganLogger);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500);
    res.send({
        error: {
            message: error.message,
            url: req.baseUrl,
        },
    });
});

initRoute(app);

export default app;
