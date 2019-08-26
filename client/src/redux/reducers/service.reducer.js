import { authConstants, serviceConstants } from "../constants";

export function service(state = {}, action) {
  switch (action.type) {
    case serviceConstants.POSTBACK_BEGIN:
      return {};
    case serviceConstants.POSTBACK_ERROR:
      return {
        ...state,
        error: action.error
      };
    case authConstants.LOGIN_SUCCESS:
      return {};
    default:
      return state;
  }
}
