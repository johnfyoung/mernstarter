import { applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { logger, userEvent } from "./logger";

let devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
if (
  process.env.NODE_ENV === "prod" ||
  process.env.NODE_ENV === "production" ||
  process.env.TESTING
) {
  devTools = (a) => a;
}

// Redux Thunk middleware allows you to write action creators that return a function instead of an action

export default compose(applyMiddleware(thunk, logger, userEvent), devTools);
