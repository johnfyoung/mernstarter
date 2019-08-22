import React, { Component } from "react";
import ConnectedPage from "../../connected/templates/ConnectedPage";

export default class Register extends Component {
  render() {
    const { nav } = this.props;
    return <ConnectedPage nav={nav}>Hello Register</ConnectedPage>;
  }
}
