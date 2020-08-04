import { navConstants } from "../constants/nav.constants";

export const navActions = {
  locationChanged: (navKey) => ({
    type: navConstants.LOCATION_CHANGED,
    navKey,
  }),
};
