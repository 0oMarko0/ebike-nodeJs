import app from "./app";
import chalk from "chalk";
import logger from "./utils/logger";
import MongoDB from "./data/database/mongo";
import DependencyInjection from "./utils/dependency-injection";

const dip = new DependencyInjection();

const server = new Promise((resolve, reject) => {
    MongoDB.connect()
        .then(() => {
            dip.bootstrap();

            app.listen(app.get("port"), () => {
                logger.info(
                    chalk.green(`App is running at http://localhost:${app.get("port")} in ${app.get("env")} mode`),
                );
                logger.info(chalk.yellow("Press CTRL-C to stop"));
            });
            resolve();
        })
        .catch(reject);
});

export default server;
