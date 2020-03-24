import express from "express";
//import { dataPullNames } from "../../config";
import { dbg, logError } from "../../util/tools";
import api from "../../util/apis/api-corona";

import { statsController } from "../../controllers";
// import wastate from "../../util/apis/scrape-state";
// import {
//   CasesByCounty,
//   CasesByAge,
//   CasesByPosNeg,
//   CasesBySex,
//   DataPull
// } from "../../models";

const router = express.Router();

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
  const result = await statsController.scrapeWAState();

  if (result) {
    res.json(result);
  } else {
    res.status(500).send("Unexpected failure gathering data");
  }

  // try {
  //   const result = await wastate();
  //   if (await DataPull.isNew(result.lastUpdated, dataPullNames.WASTATE)) {
  //     dbg("Create a new dataPull");
  //     const newDataPull = new DataPull({
  //       name: dataPullNames.WASTATE,
  //       pullTime: result.lastUpdated
  //     });
  //     await newDataPull.save(function(err) {
  //       if (err) {
  //         logError(`Error saving DataPull: ${err}`);
  //       }
  //     });
  //     dbg("New datapull", newDataPull);
  //     await CasesByCounty.saveDataPull(
  //       result.tables[0].rows,
  //       result.lastUpdated,
  //       newDataPull
  //     );
  //     await CasesByPosNeg.saveCases(
  //       result.tables[1],
  //       result.lastUpdated,
  //       newDataPull
  //     );
  //     await CasesByAge.saveCases(
  //       result.tables[2],
  //       result.lastUpdated,
  //       newDataPull
  //     );
  //     await CasesBySex.saveCases(
  //       result.tables[3],
  //       result.lastUpdated,
  //       newDataPull
  //     );
  //   }
  //   res.json(result);
  // } catch (err) {
  //   dbg("Error access api", err);
  //   res.send("fail");
  // }
});

export default router;
