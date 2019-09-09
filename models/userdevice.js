import mongoose from "mongoose";
import uuidv4 from "uuid/v4";
const Schema = mongoose.Schema;
import { Request } from "./request";

const userDeviceSchema = new Schema({
  uuid: {
    type: String,
    default: uuidv4
  },
  os: String,
  browser: {
    name: String,
    version: String
  },
  platform: String,
  requests: [{ type: Schema.Types.ObjectId, ref: Request.modelName }]
});

export const UserDevice = mongoose.model("userDevices", userDeviceSchema);
