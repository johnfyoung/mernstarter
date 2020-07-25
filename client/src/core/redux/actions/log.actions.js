import { serviceConstants } from "../constants";
import { logServices } from "../../services";

const captureUserEvent = event => {
  return { type: serviceConstants.LOG_TYPE_EVENT, event };
};

export const logActions = {
  captureUserEvent
};
