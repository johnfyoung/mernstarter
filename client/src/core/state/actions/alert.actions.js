import { alertConstants } from "../constants/alert.constants";

export const alertActions = {
  success: (payload) => {
    return { type: alertConstants.SUCCESS, payload };
  },
  error: (payload) => {
    return { type: alertConstants.ERROR, payload };
  },
  warn: (payload) => {
    return { type: alertConstants.WARN, payload };
  },
  info: (payload) => {
    return { type: alertConstants.INFO, payload };
  },
  announce: (payload) => {
    return { type: alertConstants.ANNOUNCE, payload };
  },
  shown: (payload) => {
    return { type: alertConstants.SHOWN, payload };
  },
  hidden: (payload) => {
    return { type: alertConstants.HIDDEN, payload };
  },
  clearAlert: () => {
    return { type: alertConstants.CLEARALERT };
  },
};
