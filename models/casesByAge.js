import mongoose, { Schema } from "mongoose";
import { fieldNamesByAge } from "../config/constants";
import { logError } from "../util/tools";

const casesByAgeSchema = new Schema({
  ageGroup: String,
  pctCases: Number,
  pctDeaths: Number,
  updateTime: Date,
  dataPull: { type: Schema.Types.ObjectId, ref: "DataPull" }
});

casesByAgeSchema.statics.saveCases = async (table, updateTime, newDataPull) => {
  table.rows.forEach(async r => {
    const casesByAge = new CasesByAge({
      ageGroup: r[fieldNamesByAge.AGEGROUP],
      pctCases: r[fieldNamesByAge.PCTCASES].replace("%", "") * 0.01,
      pctDeaths: r[fieldNamesByAge.PCTDEATHS].replace("%", "") * 0.01,
      updateTime: updateTime,
      dataPull: newDataPull._id
    });

    await casesByAge.save(err => {
      if (err) {
        logError(`Error saving casesByAge: ${err}`);
      }
    });
  });
};

export const CasesByAge = mongoose.model("casesByAge", casesByAgeSchema);
