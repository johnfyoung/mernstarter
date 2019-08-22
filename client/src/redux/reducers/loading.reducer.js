import { authConstants } from "../constants";

export const loading = (state = false, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return true;
    case authConstants.LOGIN_FAILURE:
    case authConstants.LOGIN_SUCCESS:
      return false;
    default:
      return state;
  }
};
