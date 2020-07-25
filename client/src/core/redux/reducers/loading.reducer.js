import { authConstants, serviceConstants } from "../constants";

export const loading = (state = false, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
    case serviceConstants.POSTBACK_BEGIN:
      return true;
    case serviceConstants.POSTBACK_END:
    case authConstants.LOGIN_FAILURE:
    case authConstants.LOGIN_SUCCESS:
      return false;
    default:
      return state;
  }
};
