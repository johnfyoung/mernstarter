import React, { Fragment, useEffect, useState } from "react";
import { navigate } from "@reach/router";
import { permissionsConstants } from "../../state/constants/permissions.constants";
import { Row, Column } from "../layout";
import { dbg } from "../../utils";

import { alertActions, useAlertContext } from "../../state";
import { useAuthContext, authActions } from "../../state";

const PrivateRoute = ({ component: Component, permissions = [], ...rest }) => {
  const alertDispatch = useAlertContext()[1];
  const [alertedState, setAlertedState] = useState(false);
  const [authState, authDispatch] = useAuthContext();
  const [permissionState, setPermissionState] = useState(false);

  useEffect(() => {
    dbg.log("PrivateRoute::auth", authState);

    if (!authState.loggingOut && !authState.authenticated && !alertedState) {
      alertDispatch(
        alertActions.error("Please sign in for access", true, 6000)
      );
      setAlertedState(true);
      navigate("/signin");
    }

    if (permissions.length > 0 && authState.permissions) {
      setPermissionState(
        authState.permissions.filter((p) => permissions.includes(p)).length >
          0 || authState.permissions.includes(permissionsConstants.SITE_ALL)
      );
    } else {
      setPermissionState(true);
    }
  }, [authState]);

  return (
    <Fragment>
      {(authState.authenticated && permissionState && (
        <Component {...rest} />
      )) || (
        <div className="container">
          <Row>
            <Column className="text-danger">Not permitted</Column>
          </Row>
        </div>
      )}
    </Fragment>
  );
};

export default PrivateRoute;
