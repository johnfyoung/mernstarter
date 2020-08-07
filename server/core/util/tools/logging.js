import { createLogger, transports, format } from "winston";
import "winston-mongodb";
require("dotenv").config();

const reqestDeniedLogger = createLogger({
  format: format.json(),
  transports: [
    new transports.Console(),
    new transports.MongoDB({
      level: "info",
      db: process.env.MONGODB_URI,
      collection: "logDeniedRequests"
    })
  ]
});

export const logDeniedRequest = async data => {
  await reqestDeniedLogger.info(data.req.useragent.source, {
    metadata: {
      device: data.req.device ? data.req.device._id : null,
      time: new Date(),
      method: data.req.method,
      ip: data.req.ip,
      hostname: data.req.hostname,
      path: data.req.path,
      xhr: data.req.xhr
    }
  });
};

const errorLogger = createLogger({
  format: format.json(),
  transports: [
    new transports.Console(),
    new transports.MongoDB({
      level: "error",
      db: process.env.MONGODB_URI,
      collection: "logErrors"
    })
  ]
});

export const logError = async message => {
  await errorLogger.error(message, {
    metadata: {
      time: new Date()
    }
  });
};

const jobLogger = createLogger({
  format: format.json(),
  transports: [
    new transports.Console(),
    new transports.MongoDB({
      level: "info",
      db: process.env.MONGODB_URI,
      collection: "logJobs"
    })
  ]
});

export const logJob = async message => {
  await jobLogger.info(message, {
    metadata: {
      time: new Date()
    }
  });

  await waitForLogger(jobLogger);
};

function waitForLogger(logger) {
  return new Promise(resolve => {
    logger.on("finish", resolve);
    logger.end();
  });
}
