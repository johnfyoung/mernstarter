import mongoose, { Schema } from "mongoose";
import { fieldNamesByCounty } from "../config/constants";
import { logError } from "../util/tools";

const casesByCountySchema = new Schema({
  county: String,
  cases: Number,
  deaths: Number,
  updateTime: Date,
  dataPull: { type: Schema.Types.ObjectId, ref: "DataPull" }
});

casesByCountySchema.statics.saveDataPull = function(rows, dt, dPull) {
  rows.forEach(r => {
    if (r[fieldNamesByCounty.COUNTY] !== "Total") {
      this.create(
        {
          county: r[fieldNamesByCounty.COUNTY],
          cases: r[fieldNamesByCounty.CASES],
          deaths: r[fieldNamesByCounty.DEATHS],
          updateTime: dt,
          dataPull: dPull._id
        },
        function(err) {
          if (err) {
            logError(`Error saving casesByCounty item: ${err}`);
          }
        }
      );
    }
  });
};

export const CasesByCounty = mongoose.model(
  "casesByCounty",
  casesByCountySchema
);
