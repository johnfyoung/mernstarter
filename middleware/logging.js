import { createLogger, transports, format } from "winston";
import "winston-mongodb";
require("dotenv").config();

const apiRequestLogger = createLogger({
  format: format.json(),
  transports: [
    new transports.Console(),
    new transports.MongoDB({
      level: "info",
      db: process.env.MONGODB_URI,
      collection: "requests"
    })
  ]
});

export const logRequest = () => {
  return async (req, res, next) => {
    const result = await apiRequestLogger.info(req.useragent.source, {
      metadata: {
        device: req.device ? req.device._id : null,
        time: new Date(),
        method: req.method,
        ip: req.ip,
        hostname: req.hostname,
        path: req.path,
        xhr: req.xhr
      }
    });

    next();
  };
};
