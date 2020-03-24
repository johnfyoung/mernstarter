import { dataPullNames } from "../config";
import { dbg, logError } from "../util/tools";
import wastate from "../util/apis/scrape-state";
import {
  CasesByCounty,
  CasesByAge,
  CasesByPosNeg,
  CasesBySex,
  DataPull
} from "../models";

export const statsController = {
  scrapeWAState: async () => {
    let result = null;
    try {
      result = await wastate();

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
    } catch (err) {
      logError("Error access api", err);
    }

    return result;
  }
};
