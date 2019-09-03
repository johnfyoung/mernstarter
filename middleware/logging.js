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
  return function(req, res, next) {
    apiRequestLogger.info("http-request", {
      metadata: {
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
