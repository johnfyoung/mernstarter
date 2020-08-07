import React, { useEffect } from "react";
import { globalHistory } from "@reach/router";

import Footer from "../core/components/parts/CoreFooter";
import Header from "../core/components/parts/CoreHeader";
import Nav from "../core/components/parts/CoreNav";
import AlertContainer from "../core/components/parts/AlertContainer";
import Announcement from "../core/components/parts/Announcement";
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
// import InstallPage from "../core/screens/InstallPage";
import RegisterPage from "../core/screens/RegisterPage";
import NotFoundPage from "../core/screens/NotFound";

export default function App() {
  const [navState] = useNavContext();
  const [alertState, alertDispatch] = useAlertContext();
  const [authState, authDispatch] = useAuthContext({});

  useEffect(() => {
    const session = getSession();
    if (session) {
      authDispatch(authActions.setUser(session));
    } else {
      authDispatch(authActions.logout());
    }

    document.title = process.env.REACT_APP_NAME;

    alertDispatch(alertActions.announce("Here is a default announcement"));
  }, []);

  useEffect(() => {
    return globalHistory.listen((item) => {
      alertDispatch(alertActions.clearAlerts());
    });
  });

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
          handleSignOut={() => authDispatch(authActions.logout())}
        />
      </Header>
      <AlertContainer />
      <FadeTransitionRouter>
        <PublicRoute exact path="/" component={HomePage} />
        <PublicRoute
          exact
          path="/signin"
          component={SignInPage}
          restricted={true}
          authenticated={authState.authenticated}
        />
        <PublicRoute
          exact
          path="/register"
          restricted={true}
          authenticated={authState.authenticated}
          component={RegisterPage}
        />
        <PrivateRoute
          exact
          path="/admin"
          component={AdminPage}
          authenticated={authState.authenticated}
        />
        <PrivateRoute
          exact
          path="/profile"
          component={ProfilePage}
          authenticated={authState.authenticated}
        />
        {/*<InstallPage exact path="/install" />*/}

        <NotFoundPage default />
      </FadeTransitionRouter>
      <Footer />
    </div>
  );
}
