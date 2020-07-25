import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import { Route } from "react-router-dom";
import { isEmpty } from "../../../utils";

class TransitionRoute extends Component {
  render() {
    const { component: Component, path, routePaths, ...rest } = this.props;
    if (isEmpty(path)) {
      return (
        <Route routePaths={routePaths}>
          {(routeProps) => {
            if (!routePaths.includes(routeProps.location.pathname)) {
              return (
                <CSSTransition
                  in={routeProps.match != null}
                  timeout={300}
                  classNames="fade"
                  unmountOnExit
                >
                  <Component />
                </CSSTransition>
              );
            } else {
              return <div></div>;
            }
          }}
        </Route>
      );
    } else {
      return (
        <Route {...rest} path={path}>
          {({ match }) => (
            <CSSTransition
              in={match != null}
              timeout={300}
              classNames="fade"
              unmountOnExit
            >
              <Component />
            </CSSTransition>
          )}
        </Route>
      );
    }
  }
}

export default TransitionRoute;
