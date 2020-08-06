import { alertConstants } from "../constants/alert.constants";

export const alertActions = {
  success: (message, timeOut, isDismissable) => {
    return {
      type: alertConstants.SUCCESS,
      payload: { message, timeOut, isDismissable },
    };
  },
  error: (message, timeOut, isDismissable) => {
    return {
      type: alertConstants.ERROR,
      payload: { message, timeOut, isDismissable },
    };
  },
  warn: (message, timeOut, isDismissable) => {
    return {
      type: alertConstants.WARN,
      payload: { message, timeOut, isDismissable },
    };
  },
  info: (message, timeOut, isDismissable) => {
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
};
