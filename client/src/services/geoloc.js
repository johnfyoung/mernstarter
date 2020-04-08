import { dbg } from "../utils";
import axios from "axios";

const reverseGeocode = (lat, long) => {
    return axios.get(`/api/geoloc/reverse/${lat}/${long}`).then(res => {
        dbg("geolocServices::reverseGeocode response", res);

        if (res.status === 200) {
            return res.data;
        }
    }).catch(error => {
        const err = new Error("Unexpected error occurred while geolocating your coordinates");
        err.data(error.response.data);
        throw err;
    });
};

export const geolocServices = {
    reverseGeocode
};