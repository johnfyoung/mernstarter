import { alertConstants } from "../constants/alert.constants";

export const alertActions = {
  success: (message, isDismissable = false, timeOut = false) => {
    return {
      type: alertConstants.SUCCESS,
      payload: { message, timeOut, isDismissable },
    };
  },
  error: (message, isDismissable = false, timeOut = false) => {
    return {
      type: alertConstants.ERROR,
      payload: { message, timeOut, isDismissable },
    };
  },
  warn: (message, isDismissable = false, timeOut = false) => {
    return {
      type: alertConstants.WARN,
      payload: { message, timeOut, isDismissable },
    };
  },
  info: (message, isDismissable = false, timeOut = false) => {
    return {
      type: alertConstants.INFO,
      payload: { message, timeOut, isDismissable },
    };
  },
  announce: (message, isDismissable) => {
    return {
      type: alertConstants.ANNOUNCE,
      payload: { message, isDismissable },
    };
  },
  shown: (index) => {
    return { type: alertConstants.SHOWN, payload: index };
  },
  hidden: (index) => {
    return { type: alertConstants.HIDDEN, payload: index };
  },
  clearAlert: (index) => {
    return { type: alertConstants.CLEARALERT, payload: index };
  },
  clearAlerts: (index) => {
    return { type: alertConstants.CLEARALERTS };
  },
};
