import { authConstants } from "../constants/auth.constants";
import { deleteCookie } from "../../utils";

export const authActions = {
  loginSuccess: (user) => ({
    type: authConstants.LOGIN_SUCCESS,
    payload: user,
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
