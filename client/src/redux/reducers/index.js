import { combineReducers } from "redux";

import { alert } from "./alerts.reducer";
import { auth } from "./auth.reducer";
import { nav } from "./nav.reducer";

const rootReducer = combineReducers({
  alert,
  auth,
  nav
});

export default rootReducer;
