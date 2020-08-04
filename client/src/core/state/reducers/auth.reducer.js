import React, { createContext, useReducer, useContext } from "react";
import jwt_decode from "jwt-decode";

import { isEmpty, dbg } from "../../utils";
import { authConstants } from "../constants/auth.constants";

// TODO
const authActions = {};

const AuthContext = createContext();
const { Provider } = AuthContext;

const reducer = (state, action) => {
  dbg.log(`auth.reducer::${action.type}`, action.payload);
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.payload,
      };
    case authConstants.LOGIN_SUCCESS:
      return {
        authenticated: true,
        user: action.payload,
      };
    case authConstants.LOGIN_FAILURE:
      return {};
    case authConstants.LOGOUT:
      return {};
    case authConstants.SET_CURRENT_USER:
      return {
        authenticated: isEmpty(action.payload) ? false : true,
        user: action.payload,
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

export { AuthProvider, useAuthContext };
