import React, { useEffect } from "react";
import { globalHistory, navigate } from "@reach/router";
import { permissionsConstants } from "../core/state/constants/permissions.constants";

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
  useConfigContext,
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
import UsersPage from "../core/screens/UsersPage";
import ProfilePage from "../core/screens/ProfilePage";
import InstallPage from "../core/screens/InstallPage";
import RegisterPage from "../core/screens/RegisterPage";
import NotFoundPage from "../core/screens/NotFound";

export default function App() {
  const [navState] = useNavContext();
  const [configState] = useConfigContext();
  const [alertState, alertDispatch] = useAlertContext();
  const [authState, authDispatch] = useAuthContext({});

  useEffect(() => {
    document.title = process.env.REACT_APP_NAME;
  }, []);

  useEffect(() => {
    return globalHistory.listen((item) => {
      alertDispatch(alertActions.clearAlerts());
      checkForSession();
    });
  });

  useEffect(() => {
    if (authState.expired && !authState.loggingOut) {
      authDispatch(authActions.signingOut());
      navigate("/signin");
      authDispatch(authActions.logout());
      alertDispatch(
        alertActions.error("Your session has expired.", true, 5000)
      );
    } else {
    }
  }, [authState.expired]);

  function checkForSession() {
    const session = getSession();
    dbg.log("checkForSession Session", session);
    dbg.log("checkForSession authState.authenticated", authState.authenticated);
    if (!session && authState.authenticated && !authState.loggingOut) {
      dbg.log("checkForSession cleaning up...");
      authDispatch(authActions.expired());
    }
  }

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
          userName={authState.authenticated ? authState.userName : ""}
          userPermissions={
            authState.authenticated ? authState.permissions : null
          }
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
        {configState.publicRegistration && (
          <PublicRoute
            exact
            path="/register"
            restricted={true}
            auth={authState}
            component={RegisterPage}
          />
        )}
        {!configState.isInstalled && (
          <PublicRoute
            exact
            path="/install"
            restricted={true}
            auth={authState}
            appName={process.env.REACT_APP_NAME}
            component={InstallPage}
          />
        )}
        <PrivateRoute
          exact
          path="/admin"
          component={AdminPage}
          auth={authState}
        />
        <PrivateRoute
          exact
          path="/admin/users"
          component={UsersPage}
          auth={authState}
          permissions={[
            permissionsConstants.USERS_ALL,
            permissionsConstants.USERS_VIEW,
          ]}
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
