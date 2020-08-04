import { authConstants } from "../constants/auth.constants";

export const authActions = {
  loginSuccess: (user) => ({
    type: authConstants.LOGIN_SUCCESS,
    payload: user,
  }),
  setUser: (user) => ({
    type: authConstants.SET_CURRENT_USER,
    payload: user,
  }),
  logout: () => ({
    type: authConstants.LOGOUT,
  }),
};
