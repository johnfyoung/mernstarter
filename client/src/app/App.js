import React, { useEffect } from "react";
import Footer from "../core/components/parts/CoreFooter";
import Header from "../core/components/parts/CoreHeader";
import Nav from "../core/components/parts/CoreNav";
import Announcement from "../core/components/parts/Announcement";
import FadeTransitionRouter from "../core/components/special/FadeTransitionRouter";
import {
  useAuthContext,
  useNavContext,
  useAlertContext,
  alertActions,
  authActions,
} from "../core/state";
import { getTokenPayload } from "../core/utils";

import "../core/resources/scss/main.scss";

import HomePage from "../core/screens/HomePage";
import SignInPage from "../core/screens/SignInPage";
// import InstallPage from "../core/screens/InstallPage";
// import RegisterPage from "../core/screens/RegisterPage";
import NotFoundPage from "../core/screens/NotFound";

export default function App() {
  const [navState] = useNavContext();
  const [alertState, alertDispatch] = useAlertContext();
  const [authState, authDispatch] = useAuthContext({});

  useEffect(() => {
    function checkForValidSession() {
      const payload = getTokenPayload();
      // check for expired token
      const currentTime = Date.now() / 1000;
      if (payload && payload.exp > currentTime) {
        authDispatch(authActions.setUser(payload));
      } else {
        authDispatch(authActions.logout());
      }
    }

    checkForValidSession();

    alertDispatch(alertActions.announce("Here is a default announcement"));
  }, []);

  useEffect(() => {
    if (alertState && alertState.alert) {
      setTimeout(function() {
        alertDispatch(alertActions.clearAlert());
      }, 5000);
    }
  }, [alertState.alert]);

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
          isAuthd={authState.authenticated}
          handleSignOut={() => authDispatch(authActions.logout())}
        />
      </Header>
      <FadeTransitionRouter>
        <HomePage exact path="/" />
        <SignInPage exact path="/signin" />
        {/* <RegisterPage exact path="/register" />
        <InstallPage exact path="/install" /> */}
        {/* <PrivateRoutes /> */}
        <NotFoundPage default />
      </FadeTransitionRouter>
      <Footer />
    </div>
  );
}
