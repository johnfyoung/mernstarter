import React, { useState, useEffect } from "react";
import { navigate, Link } from "@reach/router";
import {
  useAuthContext,
  authActions,
  alertActions,
  useAlertContext,
} from "../state";
import { useLoginService } from "../services/auth.services";

import { dbg, getTokenPayload } from "../utils";

import ConnectedPage from "../components/layout/ConnectedPage";

export default function SignInPage() {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    isSubmitted: false,
  });

  const [authState, authDispatch] = useAuthContext();
  const [alertState, alertDispatch] = useAlertContext();

  const [loginResult, login] = useLoginService();
  const { data, isLoading, error } = loginResult;

  useEffect(() => {
    if (formState.isSubmitted) {
      dbg.log("formState", formState);
      authDispatch(authActions.signingIn());
      login(formState.email, formState.password);
      setFormState({ ...formState, isSubmitted: false });
    }
  }, [formState.isSubmitted]);

  useEffect(() => {
    if (loginResult && loginResult.data) {
      dbg.log(loginResult.data);

      authDispatch(authActions.loginSuccess(getTokenPayload()));
      alertDispatch(alertActions.success("Login successful", true, 6000));
      navigate("/admin");
    }
  }, [loginResult]);

  const handleOnChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState({ ...formState, isSubmitted: true });
  };

  return (
    <ConnectedPage pageClass="page-signin">
      <div className="d-flex row justify-content-center">
        <div className="col-md-8 page-signin-form">
          <div className="mb-5">
            <h1>Welcome back!</h1>
            <strong className="text-secondary">Sign in for access</strong>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className={`form-control ${
                  error && error.data.email ? "is-invalid" : ""
                }`}
                id="email"
                name="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={formState.email}
                onChange={handleOnChange}
                disabled={isLoading ? "disabled" : ""}
              />
              {error && error.data.email && (
                <div className="invalid-feedback">
                  {error && error.data.email}
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className={`form-control ${
                  error && error.data.password ? "is-invalid" : ""
                }`}
                id="password"
                name="password"
                placeholder="Password"
                value={formState.password}
                onChange={handleOnChange}
                disabled={isLoading ? "disabled" : ""}
              />
              {error && error.data.password && (
                <div className="invalid-feedback">
                  {error && error.data.password}
                </div>
              )}
            </div>
            <button
              type="submit"
              className={`btn btn-primary actionbtn ${
                isLoading ? " spinning" : ""
              }`}
              disabled={isLoading ? "disabled" : ""}
            >
              {isLoading ? "Signing in..." : "Submit"}
            </button>
          </form>
          <div className="mt-3">
            Don't have an account? <Link to="/register">Register here.</Link>
          </div>
        </div>
      </div>
    </ConnectedPage>
  );
}
