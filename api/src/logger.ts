import { createLogger, format, transports } from "winston";

const winston = createLogger({
  level: "info",
  format: format.combine(format.splat(), format.simple()),
  transports: [new transports.Console()]
});

const log = () => context => {
  let message = `${context.type} :: ${context.method} :: ${context.path}`;
  winston.info(message);
};

export { winston, log };
