import { serviceConstants } from "../constants";
import { alertActions } from "../actions";
import { geolocServices } from "../../services";
import { dbg } from "../../utils";

const lookupUserLocation = (lat, long) => {
    return dispatch => {
        dispatch({ type: serviceConstants.POSTBACK_BEGIN });
        dispatch({ type: serviceConstants.GEOCODE_ALLOW, payload: { lat, long } });

        geolocServices.reverseGeocode(lat, long).then(data => {
            dispatch({ type: serviceConstants.GEOCODE_REVERSE_USERLOOKUP, payload: data });
        }).catch(err => {
            dispatch({ type: serviceConstants.POSTBACK_ERROR, error: err });
        }).finally(() => {
            dispatch({ type: serviceConstants.POSTBACK_END });
        })
    }
};

export const geolocActions = {
    lookupUserLocation
};