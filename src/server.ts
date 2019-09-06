import app from "./app";
import chalk from "chalk";
import logger from "./utils/logger";

const server = app.listen(app.get("port"), () => {
    logger.info(chalk.green(`App is running at http://localhost:${app.get("port")} in ${app.get("env")} mode`));
    logger.info(chalk.yellow("Press CTRL-C to stop"));
});

export default server;
