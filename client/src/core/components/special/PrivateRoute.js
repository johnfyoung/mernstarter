import React, { Fragment } from "react";
import { useAuthContext } from "../../state";

export default function PrivateRoute(props) {
  const [authState, authDispatch] = useAuthContext();
  let { as: Comp, ...props } = props;

  return (
    <Fragment>
      {authState.authenticated ? <Comp {...props} /> : <Login />}
    </Fragment>
  );
}
