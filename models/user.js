import mongoose, { SchemaType } from "mongoose";
const Schema = mongoose.Schema;

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
      ref: "Group"
    }
  ],
  permissions: {
    type: Schema.Types.Array
  }
});

export const User = mongoose.model("users", userSchema);
