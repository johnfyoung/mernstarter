import React from "react";
import ReactDOM from "react-dom";

import { Location } from "@reach/router";

import ServiceProvider from "./core/services/service.provider";

import { navConfig } from "./app/config";

import {
  AuthProvider,
  AlertProvider,
  NavProvider,
  setAuthentication,
} from "./core/state";

import { setRequestedWithHeader, getSession } from "./core/utils";

import App from "./app/App.js";

import * as serviceWorker from "./serviceWorker";

setRequestedWithHeader();

ReactDOM.render(
  <ServiceProvider>
    <AlertProvider>
      <AuthProvider value={setAuthentication(getSession())}>
        <NavProvider value={navConfig}>
          <Location>{({ location }) => <App location={location} />}</Location>
        </NavProvider>
      </AuthProvider>
    </AlertProvider>
  </ServiceProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
