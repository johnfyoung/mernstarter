import { combineReducers } from "redux";

import { alert } from "./alerts.reducer";
import { auth } from "./auth.reducer";
import { nav } from "./nav.reducer";
import { loading } from "./loading.reducer";
import { service } from "./service.reducer";

const rootReducer = combineReducers({
  alert,
  auth,
  nav,
  loading,
  service
});

export default rootReducer;
