import { authConstants, serviceConstants, geolocService } from "../constants";

const initialState = {};

export function service(state = initialState, action) {
  switch (action.type) {
    case serviceConstants.POSTBACK_BEGIN:
      return {};
    case serviceConstants.POSTBACK_ERROR:
      return {
        ...state,
        error: action.error
      };
    case authConstants.LOGIN_SUCCESS:
      return {};
    case serviceConstants.GEOCODE_ALLOW:
      return {
        ...state,
        latlong: action.payload
      };
    case serviceConstants.GEOCODE_REVERSE_USERLOOKUP:
      return {
        ...state,
        geoloc: action.payload
      };
    default:
      return state;
  }
}
