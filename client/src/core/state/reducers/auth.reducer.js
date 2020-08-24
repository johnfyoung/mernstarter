import React, { createContext, useReducer, useContext } from "react";
import jwt_decode from "jwt-decode";

import { isEmpty, dbg } from "../../utils";
import { authConstants } from "../constants/auth.constants";

const AuthContext = createContext();
const { Provider } = AuthContext;

function setAuthentication(session) {
  if (session) {
    return {
      authenticated: true,
    };
  }

  return { authenticated: false };
}

const reducer = (state, action) => {
  dbg.log(`auth.reducer::${action.type}`, action.payload);
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
        loggingOut: false,
        expired: false,
      };
    case authConstants.LOGIN_COMPLETE:
      return {
        ...state,
        loggingIn: false,
      };
    case authConstants.LOGIN_SUCCESS:
      return {
        ...state,
        ...setAuthentication(action.payload),
      };
    case authConstants.LOGIN_FAILURE:
      return {};
    case authConstants.LOGOUT_REQUEST:
      return {
        ...state,
        loggingOut: true,
        loggingIn: false,
      };
    case authConstants.LOGOUT:
      return {
        loggingOut: true,
      };
    case authConstants.AUTH_EXPIRED:
      return {
        expired: true,
      };
    case authConstants.SET_CURRENT_USER:
      return {
        ...state,
        ...setAuthentication(action.payload),
      };
    default:
      return state;
  }
};

// 4. Create the Store
const AuthProvider = ({ value = {}, ...props }) => {
  const [state, dispatch] = useReducer(reducer, value);

  return <Provider value={[state, dispatch]} {...props} />;
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuthContext, setAuthentication };
