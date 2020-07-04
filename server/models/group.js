import mongoose, { SchemaType } from "mongoose";
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  permissions: {
    type: [String]
  }
});

export const Group = mongoose.model("groups", groupSchema);
