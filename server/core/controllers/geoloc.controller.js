import axios from "axios";
import { logError, dbg } from "../util/tools";
require("dotenv").config();

const locationIQBaseURL = "https://us1.locationiq.com";


const searchGeocode = async (searchText) => {
    let result = null;
    try {
        result = await axios.get(`${locationIQBaseURL}/v1/search.php`, {
            params: {
                key: process.env.APIKEY_LOCATIONIQ,
                q: searchText,
                format: "json"
            }
        })
    } catch (err) {
        logError(`geolocation::searchGeocode::Error - ${err}`);
    }

    return result;
};

const reverseGeocode = async (lat, long) => {
    let result = null;
    try {
        const response = await axios.get(`${locationIQBaseURL}/v1/reverse.php`, {
            params: {
                key: process.env.APIKEY_LOCATIONIQ,
                lat: lat,
                lon: long,
                format: "json"
            }
        });

        result = response.data;
        dbg("Geoloc result", result);
    } catch (err) {
        logError(`geolocation::reverseGeocode::Error - ${err}`);
    }
    return result;
};

export const geolocController = {
    searchGeocode,
    reverseGeocode
}