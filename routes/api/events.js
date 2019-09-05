import express from "express";
import winston, { createLogger, format } from "winston";
import "winston-mongodb";

import { dbg } from "../../util/tools";

const router = express.Router();
require("dotenv").config();

const transports = {
  console: new winston.transports.Console({ level: "info" }),
  db: new winston.transports.MongoDB({
    level: "info",
    db: process.env.MONGODB_URI,
    collection: "userevents"
  })
};

const userEventLogger = createLogger({
  format: format.json(),
  transports: [transports.console, transports.db]
});

// TODO: Validate this input
router.post("/", (req, res) => {
  const deviceId = req.device ? req.device.id : null;
  userEventLogger.info("user-event", {
    metadata: {
      ...req.body,
      device: deviceId
    }
  });

  res.send("ok");
});

export default router;
