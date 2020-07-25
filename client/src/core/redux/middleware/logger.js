import { serviceConstants } from "../constants";
import { dbg } from "../../utils";
import { logServices } from "../../services";

/**
 * Logs an action to the console
 * @param {Object} store
 */
export const logger = store => next => action => {
  dbg.group(action.type);
  dbg.log("The action: ", action);
  const returnValue = next(action);
  dbg.log("The new state", store.getState());
  dbg.groupEnd();

  return returnValue;
};

export const userEvent = store => next => async action => {
  const result = next(action);
  if (action.type === serviceConstants.LOG_TYPE_EVENT) {
    await logServices.captureUserEvent(action.event);
  }

  return Promise.resolve(result);
};
