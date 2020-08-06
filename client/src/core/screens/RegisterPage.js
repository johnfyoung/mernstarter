import React, { useState, useEffect } from "react";
import { alertActions, useAlertContext } from "../state";
import { useRegistrationService } from "../services/auth.services";
import { Link, navigate } from "@reach/router";

import ConnectedPage from "../components/layout/ConnectedPage";
import { dbg } from "../utils";

export default function RegisterPage() {
  const [formState, setFormState] = useState({
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    userPassword: "",
    userPassword2: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const alertDispatch = useAlertContext()[1];

  const [regResult, register] = useRegistrationService();
  const { isLoading, errors } = regResult;

  useEffect(() => {
    if (submitted) {
      dbg.log("formState", formState);
      register(formState);
      setSubmitted(false);
    }
  }, [submitted]);

  useEffect(() => {
    if (regResult && regResult.data) {
      dbg.log("RegisterPage::regResult", regResult.data);
      navigate("/signin");
      alertDispatch(
        alertActions.success("Registration successful!", true, 6000)
      );
    }
  }, [regResult]);

  const handleOnChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <ConnectedPage>
      <div className="row">
        <div className="col-12">
          <h1>Register for an account</h1>
        </div>
      </div>
      <form noValidate onSubmit={handleSubmit}>
        <div className="row">
          <div className="form-group col-md-6">
            <label htmlFor="userFirstName">First name</label>
            <input
              type="userFirstName"
              name="userFirstName"
              className={`form-control ${
                errors && errors.data.userFirstName ? "is-invalid" : ""
              }`}
              id="userFirstName"
              placeholder="Enter first name"
              value={formState.userFirstName}
              onChange={handleOnChange}
              disabled={isLoading ? "disabled" : ""}
            />
            {errors && errors.data.userFirstName && (
              <div className="invalid-feedback">
                {errors && errors.data.userFirstName}
              </div>
            )}
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="userLastName">Last name</label>
            <input
              type="userLastName"
              name="userLastName"
              className={`form-control ${
                errors && errors.data.userLastName ? "is-invalid" : ""
              }`}
              id="userLastlName"
              placeholder="Enter last name"
              value={formState.userLastName}
              onChange={handleOnChange}
              disabled={isLoading ? "disabled" : ""}
            />
            {errors && errors.data.userLastName && (
              <div className="invalid-feedback">
                {errors && errors.data.userLastName}
              </div>
            )}
          </div>
          <div className="form-group col-12">
            <label htmlFor="userEmail">Email address</label>
            <input
              type="email"
              name="userEmail"
              className={`form-control ${
                errors && errors.data.userEmail ? "is-invalid" : ""
              }`}
              id="userEmail"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={formState.userEmail}
              onChange={handleOnChange}
              disabled={isLoading ? "disabled" : ""}
            />
            {errors && errors.data.userEmail && (
              <div className="invalid-feedback">
                {errors && errors.data.userEmail}
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
              name="userPassword"
              className={`form-control ${
                errors && errors.data.userPassword ? "is-invalid" : ""
              }`}
              id="userPassword"
              placeholder="Password"
              value={formState.userPassword}
              onChange={handleOnChange}
              disabled={isLoading ? "disabled" : ""}
            />
            {errors && errors.data.userPassword && (
              <div className="invalid-feedback">
                {errors && errors.data.userPassword}
              </div>
            )}
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="userPassword2">Confirm Password</label>
            <input
              type="password"
              name="userPassword2"
              className={`form-control ${
                errors && errors.data.userPassword2 ? "is-invalid" : ""
              }`}
              id="userPassword2"
              placeholder="Confirm Password"
              value={formState.userPassword2}
              onChange={handleOnChange}
              disabled={isLoading ? "disabled" : ""}
            />
            {errors && errors.data.userPassword2 && (
              <div className="invalid-feedback">
                {errors && errors.data.userPassword2}
              </div>
            )}
          </div>
          <div className="form-group col-12">
            <button
              type="submit"
              className={`btn btn-primary actionbtn ${
                isLoading ? " spinning" : ""
              }`}
              disabled={isLoading ? "disabled" : ""}
            >
              Register
            </button>
          </div>
        </div>
      </form>
      <div className="mt-3">
        Already have an account? <Link to="/signin">Sign in here.</Link>
      </div>
    </ConnectedPage>
  );
}
