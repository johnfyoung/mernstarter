import mongoose, { Schema } from "mongoose";
import { fieldNamesBySex } from "../config/constants";
import { logError } from "../util/tools";

const casesBySexSchema = new Schema({
  maleCases: Number,
  maleDeaths: Number,
  femaleCases: Number,
  femaleDeaths: Number,
  unknownCases: Number,
  unknownDeaths: Number,
  updateTime: Date,
  dataPull: { type: Schema.Types.ObjectId, ref: "DataPull" }
});

casesBySexSchema.statics.saveCases = async (table, updateTime, newDataPull) => {
  const casesBySex = new CasesBySex({
    maleCases: table.rows[1][fieldNamesBySex.PCTCASES].replace("%", "") * 0.01,
    maleDeaths:
      table.rows[1][fieldNamesBySex.PCTDEATHS].replace("%", "") * 0.01,
    femaleCases:
      table.rows[0][fieldNamesBySex.PCTCASES].replace("%", "") * 0.01,
    femaleDeaths:
      table.rows[0][fieldNamesBySex.PCTDEATHS].replace("%", "") * 0.01,
    unknownCases:
      table.rows[2][fieldNamesBySex.PCTCASES].replace("%", "") * 0.01,
    unknownDeaths:
      table.rows[2][fieldNamesBySex.PCTDEATHS].replace("%", "") * 0.01,
    updateTime: updateTime,
    dataPull: newDataPull._id
  });

  return await casesBySex.save(err => {
    if (err) {
      logError(`Error saving casesBySex: ${err}`);
    }
  });
};

export const CasesBySex = mongoose.model("casesBySex", casesBySexSchema);
