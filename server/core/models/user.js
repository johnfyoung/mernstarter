import mongoose from "mongoose";
const Schema = mongoose.Schema;

import { Group } from "./group";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  groups: [
    {
      type: Schema.Types.ObjectId,
      ref: Group.modelName
    }
  ],
  permissions: {
    type: Schema.Types.Array
  },
  devices: [{ type: Schema.Types.ObjectId, ref: "UserDevices" }]
});

export const User = mongoose.model("users", userSchema);
