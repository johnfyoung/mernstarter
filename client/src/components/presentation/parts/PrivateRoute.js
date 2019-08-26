import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import { dbg } from "../../../utils";

class PrivateRoute extends Component {
  render() {
    const { component: Component, path, ...rest } = this.props;
    dbg("PrivateRoute:: path", path);
    dbg(
      "PrivateRoute:: is allowed?",
      localStorage.getItem("user") ? "true" : "false"
    );
    return (
      <Route
        {...rest}
        path={path}
        render={props =>
          localStorage.getItem("user") ? (
            <Component {...props} />
          ) : (
            <Redirect to="/signin" />
          )
        }
      />
    );
  }
}

export default PrivateRoute;
