import logger from "pino";
import dayjs from "dayjs";

const _logger = logger({
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true,
        },
    },
    base: {
        pid: false,
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
});

export { _logger };
