import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

import { store, setRequestedWithHeader, getAuthCookieToken } from "./utils";
import { authActions } from "./redux/actions";

import "./resources/scss/main.scss";
import App from "./components/App";

import * as serviceWorker from "./serviceWorker";

const token = getAuthCookieToken();
if (token) {
  const decoded = jwt_decode(token);

  // check for expired token
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    store.dispatch(authActions.logout());
  } else {
    // set user and isAuthenticated
    store.dispatch(authActions.setCurrentUser(decoded));
  }
}

setRequestedWithHeader();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
