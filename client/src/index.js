import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { store } from "./utils/store";

import "./resources/scss/main.scss";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

console.log("process.env", process.env);

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
