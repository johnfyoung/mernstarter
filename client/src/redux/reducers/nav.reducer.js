//import { authConstants } from "../constants";
import { navConstants } from "../constants";

const initialState = {
  brand: {
    path: "/",
    label: "MERN Starter"
  },
  hasSearch: false,
  menu: {
    home: {
      path: "/",
      label: "Home",
      privilege: false
    },
    admin: {
      path: "/admin",
      label: "Admin",
      privilege: true
    }
  }
};

/**
 * This reducer is basically stubbed in case the nav needs to change depending upon actions
 * @param {*} state
 * @param {*} action
 */
export function nav(state = initialState, action) {
  switch (action.type) {
    case navConstants.LOCATION_CHANGED:
      const menu = state.menu;

      Object.keys(menu).forEach(key => {
        delete menu[key].active;
      });

      if (menu[action.navKey]) {
        return {
          ...state,
          menu: {
            ...menu,
            [action.navKey]: {
              ...menu[action.navKey],
              active: true
            }
          }
        };
      }

      return state;
    default:
      return state;
  }
}
