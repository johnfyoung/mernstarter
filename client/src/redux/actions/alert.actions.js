import { alertConstants } from "../constants";

const success = message => {
  return { type: alertConstants.SUCCESS, message };
};

const error = message => {
  return { type: alertConstants.ERROR, message };
};

const warn = message => {
  return { type: alertConstants.WARN, message };
};

const info = message => {
  return { type: alertConstants.INFO, message };
};

const announce = message => {
  return { type: alertConstants.ANNOUNCE, message };
};

const clear = () => {
  return { type: alertConstants.CLEAR };
};

export const alertActions = {
  success,
  error,
  warn,
  info,
  announce,
  clear
};
