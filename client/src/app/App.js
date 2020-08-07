import React, { useEffect, useState } from "react";
import { globalHistory, navigate } from "@reach/router";

import {
  CoreFooter as Footer,
  CoreHeader as Header,
  CoreNav as Nav,
  AlertContainer,
  Announcement,
} from "../core/components/parts/";

import FadeTransitionRouter from "../core/components/special/FadeTransitionRouter";
import {
  useAuthContext,
  useNavContext,
  useAlertContext,
  alertActions,
  authActions,
} from "../core/state";
import { getSession, dbg } from "../core/utils";

import "../core/resources/scss/main.scss";

import PrivateRoute from "../core/components/special/PrivateRoute";
import PublicRoute from "../core/components/special/PublicRoute";

import HomePage from "../core/screens/HomePage";
import SignInPage from "../core/screens/SignInPage";
import AdminPage from "../core/screens/AdminPage";
import ProfilePage from "../core/screens/ProfilePage";
import InstallPage from "../core/screens/InstallPage";
import RegisterPage from "../core/screens/RegisterPage";
import NotFoundPage from "../core/screens/NotFound";

export default function App() {
  const [navState] = useNavContext();
  const [alertState, alertDispatch] = useAlertContext();
  const [authState, authDispatch] = useAuthContext({});

  useEffect(() => {
    // const session = getSession();
    // if (session) {
    //   authDispatch(authActions.setUser(session));
    // } else {
    //   authDispatch(authActions.logout());
    // }

    document.title = process.env.REACT_APP_NAME;

    alertDispatch(alertActions.announce("Here is a default announcement"));
  }, []);

  useEffect(() => {
    return globalHistory.listen((item) => {
      alertDispatch(alertActions.clearAlerts());
    });
  });

  function handleSignOut() {
    authDispatch(authActions.signingOut());
    navigate("/");
    authDispatch(authActions.logout());
    alertDispatch(
      alertActions.success("You have successfully signed out", true, 5000)
    );
  }

  return (
    <div>
      {alertState.announcement && (
        <Announcement type={alertState.announcement.type}>
          {alertState.announcement.message}
        </Announcement>
      )}
      <Header>
        <Nav
          nav={navState}
          authenticated={authState.authenticated}
          handleSignOut={handleSignOut}
        />
      </Header>
      <AlertContainer />
      <FadeTransitionRouter>
        <PublicRoute exact path="/" component={HomePage} />
        <PublicRoute
          exact
          path="/signin"
          restricted={true}
          component={SignInPage}
          auth={authState}
        />
        <PublicRoute
          exact
          path="/register"
          restricted={true}
          auth={authState}
          component={RegisterPage}
        />
        <PublicRoute
          exact
          path="/install"
          restricted={true}
          auth={authState}
          appName={process.env.REACT_APP_NAME}
          component={InstallPage}
        />
        <PrivateRoute
          exact
          path="/admin"
          component={AdminPage}
          auth={authState}
        />
        <PrivateRoute
          exact
          path="/profile"
          component={ProfilePage}
          auth={authState}
        />
        {/*<InstallPage exact path="/install" />*/}

        <NotFoundPage default />
      </FadeTransitionRouter>
      <Footer />
    </div>
  );
}
