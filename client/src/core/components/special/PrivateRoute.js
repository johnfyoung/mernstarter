import React, { Fragment, useEffect, useState } from "react";
import { navigate } from "@reach/router";

import { alertActions, useAlertContext } from "../../state";

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  const alertDispatch = useAlertContext()[1];
  const [alertedState, setAlertedState] = useState(false);

  useEffect(() => {
    if (!authenticated && !alertedState) {
      alertDispatch(
        alertActions.error("Please sign in for access", true, 6000)
      );
      setAlertedState(true);
      navigate("/signin");
    }
  });

  return <Fragment>{authenticated && <Component {...rest} />}</Fragment>;
};

export default PrivateRoute;
