import { authConstants, usersConstants } from "../constants";
import { isEmpty } from "../../utils";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user } : {};

export function auth(state = initialState, action) {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case authConstants.LOGIN_SUCCESS:
      return {
        authenticated: true,
        user: action.user
      };
    case authConstants.LOGIN_FAILURE:
      return {};
    case authConstants.LOGOUT:
      return {};
    case usersConstants.SET_CURRENT_USER:
      return {
        authenticated: isEmpty(action.user) ? false : true,
        user: action.user
      };
    default:
      return state;
  }
}
