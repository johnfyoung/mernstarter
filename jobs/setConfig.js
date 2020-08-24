import { ConfigController } from "../server/core/controllers";
import mongoose from "mongoose";
import { dbg, logJob, logError } from "../server/core/util/tools";

require("dotenv").config();
mongoose.set("useUnifiedTopology", true);
const used = process.memoryUsage();
for (let key in used) {
  console.log(`${key} ${Math.round((used[key] / 1024 / 1024) * 100) / 100} MB`);
}

if (!process.argv[2] || parseInt(process.argv[2]) === NaN) {
  console.log("Usage: npx babel-node updateSessions.js <an enrollment id>");
  console.log("args", process.argv);
  process.exit();
}

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(async () => {
    dbg("MongoDB connected");
    try {
      const configName = process.argv[2];
      let configValue = process.argv[3];

      configValue =
        configValue === "true"
          ? true
          : configValue === "false"
          ? false
          : configValue;

      const result = await ConfigController.setSiteConfig(
        configName,
        configValue === "now" ? new Date().toISOString() : configValue
      );

      logJob(
        `setConfig:: Job completed: set config item ${configName}`,
        "setConfig"
      ).then(() => {
        mongoose.disconnect();
        process.exit();
      });
    } catch (ex) {
      logError(`Job::setConfig error: ${ex}`).then(() => {
        mongoose.disconnect();
        process.exit();
      });
    }
  })
  .catch((err) => {
    logError(`Job::setConfig error: - ${err}`).then(() => {
      mongoose.disconnect();
      process.exit();
    });
  });
