import express from "express";
import { dataPullNames } from "../../config";
import { dbg, logError } from "../../util/tools";
import api from "../../util/apis/api-corona";
import wastate from "../../util/apis/scrape-state";
import {
  CasesByCounty,
  CasesByAge,
  CasesByPosNeg,
  CasesBySex,
  DataPull
} from "../../models";

const router = express.Router();

// const saveCasesByPosNeg = async (table, updateTime, newDataPull) => {
//   const casesByPosNeg = new CasesByPosNeg({
//     positive: table.rows[0][fieldNamesByPosNeg.COUNT].replace(",", ""),
//     negative: table.rows[1][fieldNamesByPosNeg.COUNT].replace(",", ""),
//     updateTime: updateTime,
//     dataPull: newDataPull._id
//   });

//   return await casesByPosNeg.save(err =>
//     logError(`Error saving casesByPosNeg: ${err}`)
//   );
// };

// const saveCasesByAge = async (table, updateTime, newDataPull) => {
//   table.rows.forEach(async r => {
//     const casesByAge = new CasesByAge({
//       ageGroup: r[fieldNamesByAge.AGEGROUP],
//       pctCases: r[fieldNamesByAge.PCTCASES].replace("%", "") * 0.01,
//       pctDeaths: r[fieldNamesByAge.PCTDEATHS].replace("%", "") * 0.01,
//       updateTime: updateTime,
//       dataPull: newDataPull._id
//     });

//     await casesByAge.save(err => logError(`Error saving casesByAge: ${err}`));
//   });
// };

// const saveCasesBySex = async (table, updateTime, newDataPull) => {
//   const casesBySex = new CasesBySex({
//     maleCases: table.rows[1][fieldNamesBySex.PCTCASES].replace("%", "") * 0.01,
//     maleDeaths:
//       table.rows[1][fieldNamesBySex.PCTDEATHS].replace("%", "") * 0.01,
//     femaleCases:
//       table.rows[0][fieldNamesBySex.PCTCASES].replace("%", "") * 0.01,
//     femaleDeaths:
//       table.rows[0][fieldNamesBySex.PCTDEATHS].replace("%", "") * 0.01,
//     unknownCases:
//       table.rows[2][fieldNamesBySex.PCTCASES].replace("%", "") * 0.01,
//     unknownDeaths:
//       table.rows[2][fieldNamesBySex.PCTDEATHS].replace("%", "") * 0.01,
//     updateTime: updateTime,
//     dataPull: newDataPull._id
//   });

//   return await casesBySex.save(err =>
//     logError(`Error saving casesBySex: ${err}`)
//   );
// };

router.get("/cases-by-country", async (req, res) => {
  try {
    const result = await api.casesByCountry();
    dbg("Result", result);
    res.json(result);
  } catch (err) {
    dbg("Error access api", err);
    res.send("fail");
  }
});

router.get("/wa-state", async (req, res) => {
  try {
    const result = await wastate();

    if (await DataPull.isNew(result.lastUpdated, dataPullNames.WASTATE)) {
      dbg("Create a new dataPull");

      const newDataPull = new DataPull({
        name: dataPullNames.WASTATE,
        pullTime: result.lastUpdated
      });

      await newDataPull.save(function(err) {
        if (err) {
          logError(`Error saving DataPull: ${err}`);
        }
      });

      dbg("New datapull", newDataPull);

      await CasesByCounty.saveDataPull(
        result.tables[0].rows,
        result.lastUpdated,
        newDataPull
      );

      await CasesByPosNeg.saveCases(
        result.tables[1],
        result.lastUpdated,
        newDataPull
      );

      await CasesByAge.saveCases(
        result.tables[2],
        result.lastUpdated,
        newDataPull
      );

      await CasesBySex.saveCases(
        result.tables[3],
        result.lastUpdated,
        newDataPull
      );
    }

    res.json(result);
  } catch (err) {
    dbg("Error access api", err);
    res.send("fail");
  }
});

export default router;
