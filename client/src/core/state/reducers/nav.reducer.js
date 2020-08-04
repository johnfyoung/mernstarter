import React, { createContext, useReducer, useContext } from "react";

import { navConstants } from "../constants/nav.constants";

const NavContext = createContext();
const { Provider } = NavContext;

const reducer = (state, action) => {
  switch (action.type) {
    case navConstants.LOCATION_CHANGED:
      const menu = state.menu;

      Object.keys(menu).forEach((key) => {
        delete menu[key].active;
      });

      if (menu[action.navKey]) {
        return {
          ...state,
          menu: {
            ...menu,
            [action.navKey]: {
              ...menu[action.navKey],
              active: true,
            },
          },
        };
      }

      return state;
    case navConstants.SET_APPNAME:
      return {
        ...state,
        brand: {
          ...state.brand,
          label: action.appName,
        },
      };
    default:
      return state;
  }
};

// 4. Create the Store
const NavProvider = ({ value = {}, ...props }) => {
  const [state, dispatch] = useReducer(reducer, value);

  return <Provider value={[state, dispatch]} {...props} />;
};

const useNavContext = () => {
  return useContext(NavContext);
};

export { NavProvider, useNavContext };
