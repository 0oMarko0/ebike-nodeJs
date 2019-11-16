import app from "./app";
import chalk from "chalk";
import logger from "./utils/logger";
import MongoDB from "./data/database/mongo";
import DependencyInjection from "./utils/dependency-injection";
import Seed from "./data/seed/seed";
import { buildIndex } from "./data/utils";

const dip = new DependencyInjection();

const server = new Promise((resolve, reject) => {
    MongoDB.connect()
        .then(async () => {
            dip.bootstrap();
            if (process.env.SEED_DB === "true") {
                const seed = new Seed();
                seed.start()
                    .then(() => buildIndex())
                    .catch(e => logger.error(`SEED error: ${e}`));
            }
            app.listen(app.get("port"), () => {
                logger.info(
                    chalk.green(`App is running at http://localhost:${app.get("port")} in ${app.get("env")} mode`),
                );
                logger.info(chalk.yellow("Press CTRL-C to stop"));
            });
            resolve();
        })
        .catch(reject);
}).catch(e => logger.error(e));

export default server;
