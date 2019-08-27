import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

import { store, setAuthToken } from "./utils";
import { authActions } from "./redux/actions";

import "./resources/scss/main.scss";
import App from "./components/App";

import * as serviceWorker from "./serviceWorker";

if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);

  // decode the token
  const decoded = jwt_decode(localStorage.jwtToken);

  // check for expired token
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    store.dispatch(authActions.logout());
  } else {
    // set user and isAuthenticated
    store.dispatch(authActions.setCurrentUser(decoded));
  }
}

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
