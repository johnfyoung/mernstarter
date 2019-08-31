import React, { Component } from "react";
import { connect } from "react-redux";
import { Router } from "react-router-dom";

import { dbg, history } from "../utils";
import config from "../config";

import { alertActions, navActions, installActions } from "../redux/actions";

import Header from "../components/presentation/parts/Header";
import Footer from "../components/presentation/parts/Footer";
import ConnectedNav from "./connected/parts/ConnectedNav";
import Announcement from "./presentation/parts/Announcement";
import TransitionRoute from "./presentation/parts/TransitionRoute";

// Pages
import HomePage from "./connected/pages/HomePage";
import AdminPage from "./connected/pages/AdminPage";
import SignInPage from "./connected/pages/SignInPage";
import InstallPage from "./connected/pages/InstallPage";
import RegisterPage from "./connected/pages/RegisterPage";
import NotFoundPage from "./connected/pages/NotFound";

class App extends Component {
  componentDidMount = () => {
    dbg("App::componentDidMount props", this.props);
    dbg("App::componentDidMount history post App mount", history);
    this.props.announce("Here is a site wide announcement");

    history.listen(this.handleLocationChange);

    this.handleLocationChange(history.location, "PUSH");
  };

  handleLocationChange = (location, action) => {
    dbg("App::handleLocationChange Changing location app", location);
    const { nav, locationChange, clearAlert } = this.props;

    if (location.pathname === "/install") {
      this.props.checkInstallation();
    }

    // TODO refactor the authorization to paths
    // PrivateRoutes do no work with the CSSTransitions
    if (this.props.isAuthd && location.pathname === "/signin") {
      history.push("/");
    }

    clearAlert();
    if (!this.props.isAuthd && location.pathname === "/admin") {
      history.push("/signin");
      this.props.errorAlert("Please sign in for access");
    }

    const activeNavKey = this.getActiveNavKey(nav.menu, location);
    locationChange(activeNavKey);

    const pageLabel = nav.menu[activeNavKey]
      ? ` - ${nav.menu[activeNavKey].label}`
      : "";
    document.title = `${config.siteName}${pageLabel}`;
  };

  getActiveNavKey = (menu, location) => {
    const active = Object.keys(menu).filter(
      key => menu[key].path === location.pathname
    );

    return active.length > 0 ? active[0] : null;
  };

  render() {
    const topNav = <ConnectedNav />;
    const { announcement } = this.props;

    // TODO refactor the route paths list. This is needed for the
    // catch all route. Router Switch doesn't work with the CSSTransitions
    const routePaths = [
      "/",
      "/signin",
      "/signin/",
      "/admin",
      "/admin/",
      "/register",
      "/register/",
      "/install"
    ];

    return (
      <div className="App">
        {announcement && announcement.message && (
          <Announcement
            type={announcement.type}
            message={announcement.message}
          />
        )}

        <Router history={history}>
          <Header nav={topNav} />
          <TransitionRoute exact path="/" component={HomePage} />
          <TransitionRoute exact path="/signin" component={SignInPage} />
          <TransitionRoute exact path="/register" component={RegisterPage} />
          <TransitionRoute exact path="/admin" component={AdminPage} />
          <TransitionRoute exact path="/install" component={InstallPage} />
          <TransitionRoute routePaths={routePaths} component={NotFoundPage} />
          <Footer />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = ({ alert, auth, nav }) => {
  return {
    isAuthd: auth.authenticated,
    announcement: alert.announcement,
    nav
  };
};

const actionCreators = {
  announce: alertActions.announce,
  clearAlert: alertActions.clearAlert,
  locationChange: navActions.locationChanged,
  errorAlert: alertActions.error,
  checkInstallation: installActions.checkInstallation
};

const ConnectedApp = connect(
  mapStateToProps,
  actionCreators
)(App);

export default ConnectedApp;
