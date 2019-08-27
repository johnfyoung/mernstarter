import { dbg } from "../../utils";

/**
 * Logs an action to the console
 * @param {Object} store
 */
const logger = store => next => action => {
  console.group(action.type);
  dbg("The action: ", action);
  const returnValue = next(action);
  dbg("The new state", store.getState());
  console.groupEnd();

  return returnValue;
};

export default logger;
