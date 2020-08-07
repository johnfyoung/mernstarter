import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { UserDevice } from "./userdevice";

const requestSchema = new Schema({
  timestamp: Date,
  level: String,
  message: String,
  meta: {
    device: { type: Schema.Types.ObjectId, ref: "UserDevice" },
    time: Date,
    method: String,
    ip: String,
    hostname: String,
    path: String,
    xhr: Boolean
  }
});

export const Request = mongoose.model("requests", requestSchema);
