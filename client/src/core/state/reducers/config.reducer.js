import React, { createContext, useContext, useReducer } from "react";

import { isEmpty, dbg } from "../../utils";

const ConfigContext = createContext();
const { Provider } = ConfigContext;

const reducer = (state, action) => {
  return state;
};

const ConfigProvider = ({ value = {}, ...props }) => {
  const [state, dispatch] = useReducer(reducer, value);

  return <Provider value={[state, dispatch]} {...props} />;
};

const useConfigContext = () => {
  return useContext(ConfigContext);
};

export { ConfigProvider, useConfigContext };
