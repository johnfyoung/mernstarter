import { authConstants } from "../constants/auth.constants";
import { deleteCookie } from "../../utils";

export const authActions = {
  loginSuccess: (user) => ({
    type: authConstants.LOGIN_SUCCESS,
    payload: user,
  }),
  signingIn: () => ({
    type: authConstants.LOGIN_REQUEST,
  }),
  expired: () => ({
    type: authConstants.AUTH_EXPIRED,
  }),
  complete: () => ({
    type: authConstants.LOGIN_COMPLETE,
  }),
  signingOut: () => ({
    type: authConstants.LOGOUT_REQUEST,
  }),
  setUser: (user) => ({
    type: authConstants.SET_CURRENT_USER,
    payload: user,
  }),
  logout: () => {
    deleteCookie(authConstants.AUTH_COOKIE_HEADERPAYLOAD);
    return {
      type: authConstants.LOGOUT,
    };
  },
};
