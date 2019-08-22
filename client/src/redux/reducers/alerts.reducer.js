import { alertConstants } from "../constants";

export function alert(state = { alert: null, announcement: null }, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        ...state,
        alert: {
          type: "alert-success",
          message: action.message
        }
      };
    case alertConstants.ERROR:
      return {
        ...state,
        alert: {
          type: "alert-danger",
          message: action.message
        }
      };
    case alertConstants.WARN:
      return {
        ...state,
        alert: {
          type: "alert-warning",
          message: action.message
        }
      };
    case alertConstants.INFO:
      return {
        ...state,
        alert: {
          type: "alert-info",
          message: action.message
        }
      };
    case alertConstants.ANNOUNCE:
      return {
        ...state,
        announcement: {
          type: "alert-info",
          message: action.message
        }
      };
    case alertConstants.CLEARALERT:
      return {
        ...state,
        alert: null
      };
    default:
      return state;
  }
}
