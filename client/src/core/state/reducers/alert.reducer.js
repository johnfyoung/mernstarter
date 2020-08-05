import React, { createContext, useReducer, useContext } from "react";
import { alertConstants } from "../constants/alert.constants";
import { dbg } from "../../utils";

const AlertContext = createContext();
const { Provider } = AlertContext;

const reducer = (state, action) => {
  dbg.log(`alert.reducer::${action.type}`, action);
  dbg.log(`alert.reducer::state`, state);
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        ...state,
        alert: {
          type: "alert-success",
          message: action.payload,
        },
      };
    case alertConstants.ERROR:
      return {
        ...state,
        alert: {
          type: "alert-danger",
          message: action.payload,
        },
      };
    case alertConstants.WARN:
      return {
        ...state,
        alert: {
          type: "alert-warning",
          message: action.payload,
        },
      };
    case alertConstants.INFO:
      return {
        ...state,
        alert: {
          type: "alert-info",
          message: action.payload,
        },
      };
    case alertConstants.ANNOUNCE:
      return {
        ...state,
        announcement: {
          type: "alert-info",
          message: action.payload,
        },
      };
    case alertConstants.CLEARALERT:
      return {
        ...state,
        alert: {
          ...state.alert,
          expired: true,
        },
      };
    case alertConstants.HIDDEN:
      return {
        ...state,
        alert: null,
      };
    case alertConstants.SHOWN:
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};

// 4. Create the Store
const AlertProvider = ({ value = {}, ...props }) => {
  const [state, dispatch] = useReducer(reducer, value);

  return <Provider value={[state, dispatch]} {...props} />;
};

const useAlertContext = () => {
  return useContext(AlertContext);
};

export { AlertProvider, useAlertContext };
