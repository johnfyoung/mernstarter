import React, { createContext, useReducer, useContext } from "react";
import { alertConstants } from "../constants/alert.constants";
import { dbg, useLocallyPersistedReducer } from "../../utils";
import { v4 as uuidv4 } from "uuid";

const AlertContext = createContext();
const { Provider } = AlertContext;

const reducer = (state, action) => {
  dbg.log(`alert.reducer::${action.type}`, action);
  dbg.log(`alert.reducer::state`, state);

  const createAlert = (type) => ({
    type: `alert-${type}`,
    id: uuidv4(),
    message: action.payload.message,
    dismissable: action.payload.dismissable || true,
    timeOut: action.payload.timeOut || false,
  });
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        ...state,
        alerts: [...state.alerts, createAlert("success")],
      };
    case alertConstants.ERROR:
      return {
        ...state,
        alerts: [...state.alerts, createAlert("danger")],
      };
    case alertConstants.WARN:
      return {
        ...state,
        alerts: [...state.alerts, createAlert("warning")],
      };
    case alertConstants.INFO:
      return {
        ...state,
        alerts: [...state.alerts, createAlert("info")],
      };
    case alertConstants.ANNOUNCE:
      return {
        ...state,
        announcement: {
          type: "alert-info",
          message: action.payload.message,
          dismissable: action.payload.dismissable || true,
        },
      };
    case alertConstants.CLEARALERT:
      return {
        ...state,
        alerts: state.alerts.map((alert) =>
          alert.id === action.payload ? { ...alert, expired: true } : alert
        ),
      };
    case alertConstants.HIDDEN:
      return {
        ...state,
        alerts: state.alerts.filter((alert) => alert.id !== action.payload),
      };
    case alertConstants.SHOWN:
      return state;
    default:
      return state;
  }
};

// 4. Create the Store
const AlertProvider = ({ value = { alerts: [] }, ...props }) => {
  const [state, dispatch] = useLocallyPersistedReducer(
    reducer,
    value,
    "alertStore"
  );

  return <Provider value={[state, dispatch]} {...props} />;
};

const useAlertContext = () => {
  return useContext(AlertContext);
};

export { AlertProvider, useAlertContext };
