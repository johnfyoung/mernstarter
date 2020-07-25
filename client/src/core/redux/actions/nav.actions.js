import { navConstants } from "../constants";

const locationChanged = navKey => ({
  type: navConstants.LOCATION_CHANGED,
  navKey
});

export const navActions = {
  locationChanged
};
