import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Router, Route } from "react-router-dom";

import { dbg, history } from "../utils";
import config from "../config";

import { alertActions } from "../redux/actions/alert.actions";
import { navActions } from "../redux/actions/nav.actions";

import ConnectedNav from "./connected/parts/ConnectedNav";
import Announcement from "./presentation/parts/Announcement";
import PrivateRoute from "./presentation/parts/PrivateRoute";

// Pages
import HomePage from "./connected/pages/HomePage";
import AdminPage from "./connected/pages/AdminPage";
import SignInPage from "./connected/pages/SignInPage";
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

    clearAlert();

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

    return (
      <div className="App">
        {announcement && announcement.message && (
          <Announcement
            type={announcement.type}
            message={announcement.message}
          />
        )}
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={() => <HomePage nav={topNav} />} />
            <PrivateRoute
              path="/admin"
              component={() => <AdminPage nav={topNav} />}
            />
            <Route
              path="/signin"
              component={() => (
                <SignInPage nav={topNav} setMsgs={this.setMessage} />
              )}
            />
            <Route component={() => <NotFoundPage nav={topNav} />} />
          </Switch>
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
  locationChange: navActions.locationChanged
};

const ConnectedApp = connect(
  mapStateToProps,
  actionCreators
)(App);

export default ConnectedApp;
