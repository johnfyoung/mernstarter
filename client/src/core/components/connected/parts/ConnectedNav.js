import React, { Component } from "react";
import { connect } from "react-redux";
import Nav from "../../presentation/parts/Nav";

import { authActions } from "../../../redux/actions/auth.actions";

import { dbg } from "../../../utils";

class ConnectedNav extends Component {
  render() {
    const { isAuthd, nav, logout } = this.props;

    dbg.log("ConnectedNav::render nav", nav);

    return <Nav nav={nav} isAuthd={isAuthd} handleSignOut={logout} />;
  }
}

const mapStateToProps = ({ auth, nav }) => {
  return {
    isAuthd: auth.authenticated ? true : false,
    nav,
  };
};

const actionCreators = {
  logout: authActions.logout,
};

export default connect(mapStateToProps, actionCreators)(ConnectedNav);
