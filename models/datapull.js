import mongoose, { Schema } from "mongoose";
import { dbg, logError, isEmpty, isABefore } from "../util/tools";

const dataPullSchema = new Schema({
  name: String,
  pullTime: Date
});

// check to see if the suplied dt is newer then the most recent datapull
dataPullSchema.statics.isNew = async function(dt, name) {
  const dataPull = await this.findLatest(name);
  dbg("find result", dataPull);
  if (isEmpty(dataPull) || isABefore(dataPull.pullTime, dt)) {
    dbg("got a new dataPull");
    return true;
  } else {
    dbg("no new dataPull");
    false;
  }
};

dataPullSchema.statics.findLatest = async function(name) {
  try {
    const result = await this.find({ name })
      .sort({ pullTime: -1 })
      .limit(1);
    if (result.length > 0) {
      return result[0];
    }

    return null;
  } catch (err) {
    logError(`Error getting latest DataPull: ${err}`);
  }
};

export const DataPull = mongoose.model("dataPulls", dataPullSchema);
