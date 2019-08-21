import React, { Component } from "react";
import { connect } from "react-redux";
import Nav from "../../presentation/parts/Nav";

import { dbg } from "../../../utils";

class ConnectedNav extends Component {
  componentDidMount = () => {
    // history.listen((location, action) => {
    //   this.handleLocationChange(location, action);
    // });
    // this.handleLocationChange(history.location, "PUSH");
  };

  render() {
    const { isAuthd, nav } = this.props;

    dbg("nav", nav);

    // const active = Object.keys(nav.menu).filter(
    //   key => nav.menu[key].path === history.location.pathname
    // );

    return (
      <Nav
        nav={nav}
        isAuthd={isAuthd}
        handleSignOut={() => {
          dbg("Signing out");
        }}
      />
    );
  }
}

const mapStateToProps = ({ auth, nav }) => {
  return {
    isAuthd: auth.authenticated ? true : false,
    nav
  };
};

export default connect(mapStateToProps)(ConnectedNav);
