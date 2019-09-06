import morgan from "morgan";
import appRoot from "app-root-path";
import winston, { Logger, transports } from "winston";

const { combine } = winston.format;

const loggerFormat = combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(info => {
        const { timestamp, level, message, ...args } = info;

        const ts = timestamp.slice(0, 19).replace("T", " ");
        return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ""}`;
    }),
);

const options = {
    file: {
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        maxsize: 5242880,
        maxFiles: 5,
    },
    console: {
        format: loggerFormat,
    },
};

const logger: Logger = winston.createLogger({
    transports: [new transports.File(options.file), new transports.Console(options.console)],
    exitOnError: false,
});

let morganLoggingPolicy = "short";

if (process.env.NODE_ENV === "development") {
    morganLoggingPolicy = "dev";
}

const stream = {
    write: (message: string) => {
        logger.info(message);
    },
};

export const morganLogger = morgan(morganLoggingPolicy, { stream });
export default logger;
