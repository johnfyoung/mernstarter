import React, { Fragment, useEffect, useState } from "react";
import { navigate } from "@reach/router";

import { alertActions, useAlertContext } from "../../state";

const PublicRoute = ({
  component: Component,
  authenticated,
  restricted,
  ...rest
}) => {
  const alertDispatch = useAlertContext()[1];
  const [alertedState, setAlertedState] = useState(false);

  useEffect(() => {
    if (authenticated && restricted && !alertedState) {
      alertDispatch(alertActions.warn("You are already signed in", true, 6000));
      setAlertedState(true);
      navigate("/admin");
    }
  });

  return (
    <Fragment>
      {(!restricted || !authenticated) && <Component {...rest} />}
    </Fragment>
  );
};

export default PublicRoute;
