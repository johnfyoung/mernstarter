import React, { Component } from "react";
import PageTemplate from "../templates/PageTemplate";
import "../../resources/scss/SignIn.scss";

class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { nav, handleSignIn } = this.props;

    return (
      <PageTemplate pageClass="page-signin" nav={nav}>
        <div className="container">
          <div className="d-flex row justify-content-center">
            <div className="col-8 page-signin-form">
              <h1>Sign in for access:</h1>
              <form onSubmit={e => handleSignIn(e, this.state)}>
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
      </PageTemplate>
    );
  }
}

export default SignIn;
