require("dotenv").config();
const remoteHost = "coronavirus-monitor.p.rapidapi.com";
const apiKey = process.env.RAPIDAPI_APP_KEY;
import axios from "axios";

import { logError } from "../tools";

const callApi = async (path, params = null) => {
  let data = null;
  try {
    const response = await axios.get(
      `https://${remoteHost}/coronavirus/${path}`,
      {
        headers: {
          "x-rapidapi-host": remoteHost,
          "x-rapidapi-key": apiKey
        }
      }
    );

    data = response.data;
  } catch (err) {
    logError(`Error retrieving from Coronavirus api: ${err}`);
  }

  return data;
};

export default {
  casesByCountry: () => callApi("cases_by_country.php")
};
