import { applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "./logger";

// Redux Thunk middleware allows you to write action creators that return a function instead of an action

export default compose(
  applyMiddleware(thunk, logger),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
