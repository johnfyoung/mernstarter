import React, { Fragment, useEffect, useState } from "react";
import { navigate } from "@reach/router";
import { dbg } from "../../utils";

import { alertActions, useAlertContext } from "../../state";
import { useAuthContext, authActions } from "../../state";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const alertDispatch = useAlertContext()[1];
  const [alertedState, setAlertedState] = useState(false);
  const [authState, authDispatch] = useAuthContext();

  useEffect(() => {
    dbg.log("PrivateRoute::auth", authState);

    if (!authState.loggingOut && !authState.authenticated && !alertedState) {
      alertDispatch(
        alertActions.error("Please sign in for access", true, 6000)
      );
      setAlertedState(true);
      navigate("/signin");
    }
  }, [authState]);

  return (
    <Fragment>{authState.authenticated && <Component {...rest} />}</Fragment>
  );
};

export default PrivateRoute;
