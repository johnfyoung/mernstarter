import React, { Component } from "react";
import { connect } from "react-redux";

import { dbg } from "../../../utils";
import { installActions } from "../../../redux/actions";
import ConnectedPage from "../templates/ConnectedPage";

class InstallPage extends Component {
  state = {
    errors: {},
    appName: this.props.appName,
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    userPassword: "",
    userPassword2: "",
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {
      appName,
      userFirstName,
      userLastName,
      userEmail,
      userPassword,
      userPassword2,
    } = this.state;

    const site = {
      appName,
      userFirstName,
      userLastName,
      userEmail,
      userPassword,
      userPassword2,
    };

    this.props.install(site);

    dbg.log("InstallPage::submit props", this.props);
  };

  onChange = (e, field) => {
    this.setState({
      [field]: e.target.value,
    });
  };

  render() {
    const { nav, service } = this.props;
    const errors = service.error ? service.error : {};
    return (
      <ConnectedPage pageClass="page-signin" nav={nav}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="card col-md-8">
              <div className="card-body">
                <h1 className="card-title">Installation</h1>
                <p className="card-text">
                  Before you can use this application please provide the
                  following details
                </p>

                <form noValidate onSubmit={this.onSubmit}>
                  <h2>App details</h2>
                  <div className="form-group">
                    <label htmlFor="appName">App name</label>
                    <input
                      type="appName"
                      className={`form-control ${
                        errors.appName ? "is-invalid" : ""
                      }`}
                      id="appName"
                      aria-describedby="appNameHelp"
                      placeholder="Enter an app name"
                      value={this.state.appName}
                      disabled
                    />
                    {errors.appName && (
                      <div className="invalid-feedback">{errors.appName}</div>
                    )}
                    <small id="appNameHelp" className="form-text text-muted">
                      To set the App Name, use the instructions in the README
                    </small>
                  </div>
                  <hr />
                  <h2>Super user details</h2>
                  <div className="row">
                    <div className="form-group col-md-6">
                      <label htmlFor="userFirstName">First name</label>
                      <input
                        type="userFirstName"
                        className={`form-control ${
                          errors.userFirstName ? "is-invalid" : ""
                        }`}
                        id="userFirstName"
                        placeholder="Enter first name"
                        value={this.state.userFirstName}
                        onChange={(e) => this.onChange(e, "userFirstName")}
                      />
                      {errors.userFirstName && (
                        <div className="invalid-feedback">
                          {errors.userFirstName}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="userLastName">Last name</label>
                      <input
                        type="userLastName"
                        className={`form-control ${
                          errors.userLastName ? "is-invalid" : ""
                        }`}
                        id="userLastlName"
                        placeholder="Enter last name"
                        value={this.state.userLastName}
                        onChange={(e) => this.onChange(e, "userLastName")}
                      />
                      {errors.userLastName && (
                        <div className="invalid-feedback">
                          {errors.userLastName}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-12">
                      <label htmlFor="userEmail">Email address</label>
                      <input
                        type="email"
                        className={`form-control ${
                          errors.userEmail ? "is-invalid" : ""
                        }`}
                        id="userEmail"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        value={this.state.userEmail}
                        onChange={(e) => this.onChange(e, "userEmail")}
                      />
                      {errors.userEmail && (
                        <div className="invalid-feedback">
                          {errors.userEmail}
                        </div>
                      )}
                      <small id="emailHelp" className="form-text text-muted">
                        We'll never share your email with anyone else.
                      </small>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="userPassword">Password</label>
                      <input
                        type="password"
                        className={`form-control ${
                          errors.userPassword ? "is-invalid" : ""
                        }`}
                        id="userPassword"
                        placeholder="Password"
                        value={this.state.userPassword}
                        onChange={(e) => this.onChange(e, "userPassword")}
                      />
                      {errors.userPassword && (
                        <div className="invalid-feedback">
                          {errors.userPassword}
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="userPassword2">Confirm Password</label>
                      <input
                        type="password"
                        className={`form-control ${
                          errors.userPassword2 ? "is-invalid" : ""
                        }`}
                        id="userPassword2"
                        placeholder="Confirm Password"
                        value={this.state.userPassword2}
                        onChange={(e) => this.onChange(e, "userPassword2")}
                      />
                      {errors.userPassword2 && (
                        <div className="invalid-feedback">
                          {errors.userPassword2}
                        </div>
                      )}
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary actionbtn">
                    Install
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </ConnectedPage>
    );
  }
}

const mapStateToProps = ({ service, nav }) => ({
  service,
  appName: nav.brand.label,
});

// const mapDispatchToProps = dispatch => ({
//   install: payload => dispatch(install(payload))
// });

const actionCreators = {
  install: installActions.install,
};

export default connect(mapStateToProps, actionCreators)(InstallPage);
