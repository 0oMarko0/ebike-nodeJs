import app from "./app";
import logger from "./utils/logger";
import MongoDB from "./data/database/mongo";
import DependencyInjection from "./utils/dependency-injection";
import Seed from "./data/seed/seed";
import { buildIndex } from "./data/utils";

const dip = new DependencyInjection();

const server = new Promise<void>((resolve, reject) => {
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
                logger.info(`App is running at http://localhost:${app.get("port")} in ${app.get("env")} mode`);
                logger.info("Press CTRL-C to stop");
            });
            resolve();
        })
        .catch(e => {
            logger.error(e);
            reject();
        });
}).catch(e => logger.error(e));

export default server;
