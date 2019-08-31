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
    const { nav, service, loading } = this.props;
    const errors = service.error ? service.error : {};

    return (
      <ConnectedPage pageClass="page-signin" nav={nav}>
        <div className="d-flex row justify-content-center">
          <div className="col-md-8 page-signin-form">
            <h1>Sign in for access:</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  id="email"
                  name="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.handleOnChange}
                  disabled={loading ? "disabled" : ""}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleOnChange}
                  disabled={loading ? "disabled" : ""}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              <button
                type="submit"
                className={`btn btn-primary actionbtn ${
                  loading ? " spinning" : ""
                }`}
                disabled={loading ? "disabled" : ""}
              >
                {loading ? "Signing in..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </ConnectedPage>
    );
  }
}

const mapStateToProps = ({ service, loading }) => ({
  service,
  loading
});

const actionCreators = {
  login: authActions.login
};

export default connect(
  mapStateToProps,
  actionCreators
)(SignInPage);
