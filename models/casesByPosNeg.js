import mongoose, { Schema } from "mongoose";
import { fieldNamesByPosNeg } from "../config/constants";
import { logError } from "../util/tools";

const casesByPosNegSchema = new Schema({
  positive: Number,
  negative: Number,
  updateTime: Date,
  dataPull: { type: Schema.Types.ObjectId, ref: "DataPull" }
});

casesByPosNegSchema.statics.saveCases = async (
  table,
  updateTime,
  newDataPull
) => {
  const casesByPosNeg = new CasesByPosNeg({
    positive: table.rows[0][fieldNamesByPosNeg.COUNT].replace(",", ""),
    negative: table.rows[1][fieldNamesByPosNeg.COUNT].replace(",", ""),
    updateTime: updateTime,
    dataPull: newDataPull._id
  });

  return await casesByPosNeg.save(err => {
    if (err) {
      logError(`Error saving casesByPosNeg: ${err}`);
    }
  });
};

export const CasesByPosNeg = mongoose.model(
  "casesByPosNeg",
  casesByPosNegSchema
);
