import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Router, Route } from "react-router-dom";

import API from "../services";
import { dbg, history } from "../utils";
import config from "../config";

import { alertActions } from "../redux/actions/alert.actions";
import { navActions } from "../redux/actions/nav.actions";

import ConnectedNav from "./connected/parts/ConnectedNav";
import Announcement from "./presentation/parts/Announcement";

// Pages
import HomePage from "./connected/pages/HomePage";
import AdminPage from "./connected/pages/AdminPage";
import SignInPage from "./connected/pages/SignInPage";
import NotFoundPage from "./connected/pages/NotFound";

class App extends Component {
  componentDidMount = () => {
    dbg("App props", this.props);
    dbg("history post App mount", history);
    dbg("props post App mount", this.props);
    this.props.announce("Hello World");

    history.listen(this.handleLocationChange);

    this.handleLocationChange(history.location, "PUSH");
  };

  handleLocationChange = (location, action) => {
    dbg("Changing location app", location);
    const { nav, locationChange } = this.props;

    const activeNavKey = this.getActiveNavKey(nav.menu, location);
    locationChange(activeNavKey);

    const pageLabel = nav.menu[activeNavKey]
      ? ` - ${nav.menu[activeNavKey].label}`
      : "";
    document.title = `${config.siteName}${pageLabel}`;

    // if (this.props.isAuthd === true && location.pathname === "/signin") {
    //   history.push("/");
    //   return;
    // }
    // if (this.props.activePageLabel) {
    //   document.title = `${config.siteName} - ${this.props.activePageLabel}`;
    // }
  };

  getActiveNavKey = (menu, location) => {
    const active = Object.keys(menu).filter(
      key => menu[key].path === location.pathname
    );

    return active.length > 0 ? active[0] : null;
  };

  handleSignIn = (e, { email, password }) => {
    e.preventDefault();

    if (API.auth.authenticate(email, password)) {
      this.setState(
        {
          authorized: true
        },
        () => {
          this.handleLocationChange(this.props.location, "PUSH");
        }
      );
    }

    dbg("handling sign in", email, password);
  };

  handleSignOut = () => {
    API.auth.revoke();

    this.setState({
      authorized: false
    });
  };

  render() {
    const topNav = <ConnectedNav />;
    const { announcement } = this.props;

    dbg("announcement", announcement);
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
            <Route path="/admin" component={() => <AdminPage nav={topNav} />} />
            <Route
              path="/signin"
              component={() => (
                <SignInPage
                  nav={topNav}
                  handleSignIn={this.handleSignIn}
                  setMsgs={this.setMessage}
                />
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
  locationChange: navActions.locationChanged
};

const ConnectedApp = connect(
  mapStateToProps,
  actionCreators
)(App);

export default ConnectedApp;
