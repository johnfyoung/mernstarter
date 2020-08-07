import React, { Fragment, useEffect, useState } from "react";
import { navigate } from "@reach/router";
import { dbg } from "../../utils";

import { alertActions, useAlertContext } from "../../state";
import { authActions, useAuthContext } from "../../state";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const alertDispatch = useAlertContext()[1];
  const [alertedState, setAlertedState] = useState(false);
  const [authState, authDispatch] = useAuthContext();

  useEffect(() => {
    dbg.log("PublicRoute::auth", authState);

    if (authState.loggingIn && authState.authenticated && restricted) {
      authDispatch(authActions.complete());
    } else {
      if (
        authState &&
        !authState.loggingIn &&
        authState.authenticated &&
        restricted &&
        !alertedState
      ) {
        alertDispatch(
          alertActions.warn("You are already signed in", true, 6000)
        );
        setAlertedState(true);
        navigate("/admin");
      }
    }
  }, [authState.loggingIn]);

  return (
    <Fragment>
      {(!restricted || !authState.authenticated) && <Component {...rest} />}
    </Fragment>
  );
};

export default PublicRoute;
