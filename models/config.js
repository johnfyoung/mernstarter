import mongoose from "mongoose";
const Schema = mongoose.Schema;

const configSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  value: {
    type: {},
    required: true
  }
});

export const Config = mongoose.model("configs", configSchema);
