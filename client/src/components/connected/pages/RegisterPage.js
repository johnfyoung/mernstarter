import React, { Component } from "react";
import { connect } from "react-redux";

import { dbg } from "../../../utils";
import ConnectedPage from "../templates/ConnectedPage";
import { usersActions } from "../../../redux/actions";

class RegisterPage extends Component {
  state = {
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    userPassword: "",
    userPassword2: ""
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.register(this.state);

    dbg.log("RegisterPage::submit props", this.props);
  };

  onChange = (e, field) => {
    this.setState({
      [field]: e.target.value
    });
  };
  render() {
    const { service, loading } = this.props;
    const errors = service.error ? service.error : {};
    return (
      <ConnectedPage>
        <div className="row">
          <div className="col-12">
            <h1>Register for an account</h1>
          </div>
        </div>
        <form noValidate onSubmit={this.onSubmit}>
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
                onChange={e => this.onChange(e, "userFirstName")}
                disabled={loading ? "disabled" : ""}
              />
              {errors.userFirstName && (
                <div className="invalid-feedback">{errors.userFirstName}</div>
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
                onChange={e => this.onChange(e, "userLastName")}
                disabled={loading ? "disabled" : ""}
              />
              {errors.userLastName && (
                <div className="invalid-feedback">{errors.userLastName}</div>
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
                onChange={e => this.onChange(e, "userEmail")}
                disabled={loading ? "disabled" : ""}
              />
              {errors.userEmail && (
                <div className="invalid-feedback">{errors.userEmail}</div>
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
                onChange={e => this.onChange(e, "userPassword")}
                disabled={loading ? "disabled" : ""}
              />
              {errors.userPassword && (
                <div className="invalid-feedback">{errors.userPassword}</div>
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
                onChange={e => this.onChange(e, "userPassword2")}
                disabled={loading ? "disabled" : ""}
              />
              {errors.userPassword2 && (
                <div className="invalid-feedback">{errors.userPassword2}</div>
              )}
            </div>
            <div className="form-group col-12">
              <button
                type="submit"
                className={`btn btn-primary actionbtn ${
                  loading ? " spinning" : ""
                  }`}
                disabled={loading ? "disabled" : ""}
              >
                Register
              </button>
            </div>
          </div>
        </form>
      </ConnectedPage>
    );
  }
}

const mapStateToProps = ({ service, loading }) => ({
  service,
  loading
});

const actionCreators = {
  register: usersActions.register
};

export default connect(
  mapStateToProps,
  actionCreators
)(RegisterPage);
