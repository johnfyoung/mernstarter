import React, { Component } from "react";
import { connect } from "react-redux";

import { dbg } from "../../../utils";

import { authActions } from "../../../redux/actions";
import ConnectedPage from "../../connected/templates/ConnectedPage";

class SignInPage extends Component {
  state = {
    email: "",
    password: ""
  };

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    dbg("SignInPage::handleSubmit event", e);
    e.preventDefault();

    this.props.login(this.state.email, this.state.password);
  };

  render() {
    const { nav } = this.props;

    return (
      <ConnectedPage pageClass="page-signin" nav={nav}>
        <div className="container">
          <div className="d-flex row justify-content-center">
            <div className="col-md-8 page-signin-form">
              <h1>Sign in for access:</h1>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={this.state.email}
                    onChange={this.handleOnChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleOnChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </ConnectedPage>
    );
  }
}

const actionCreators = {
  login: authActions.login
};

export default connect(
  null,
  actionCreators
)(SignInPage);
