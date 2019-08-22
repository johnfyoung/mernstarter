import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { store } from "./utils/store";

import "./resources/scss/main.scss";
import App from "./components/App";
import { authActions } from "./redux/actions";

import * as serviceWorker from "./serviceWorker";

if (localStorage.user) {
  // set user and isAuthenticated
  store.dispatch(authActions.setCurrentUser(localStorage.user));

  // check for expired token
  const currentTime = Date.now() / 1000;

  if (localStorage.user.exp < currentTime) {
    store.dispatch(authActions.logout());
    // TODO: clear profile

    // redirect to login
    window.location.href = "/login";
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
