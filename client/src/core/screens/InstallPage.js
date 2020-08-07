import React, { useState, useEffect } from "react";
import { alertActions, useAlertContext } from "../state";
import { useInstallService, useCheckInstallService } from "../services/";
import { navigate } from "@reach/router";

import { dbg } from "../utils";
import ConnectedPage from "../components/layout/ConnectedPage";

export default function InstallPage({ appName }) {
  const [formState, setFormState] = useState({
    appName: appName,
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    userPassword: "",
    userPassword2: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  const alertDispatch = useAlertContext()[1];

  const [installResult, install] = useInstallService();
  const { error: errors } = installResult;

  const [checkInstallResult, checkInstall] = useCheckInstallService();
  const { error: checkInstallErrors } = checkInstallResult;

  useEffect(() => {
    checkInstall();
  }, []);

  useEffect(() => {
    if (checkInstallResult) {
      checkInstallResult && dbg.log("check install result", checkInstallResult);
      if (checkInstallResult.data && checkInstallResult.data.isInstalled) {
        navigate("/");
        alertDispatch(
          alertActions.error("This site has already been installed", true, 6000)
        );
      }
    }
  }, [checkInstallResult]);

  useEffect(() => {
    if (submitted) {
      install(formState);
      setSubmitted(false);
    }
  }, [submitted]);

  useEffect(() => {
    if (installResult) {
      installResult && dbg.log("reg result", installResult);
      if (installResult.data) {
        dbg.log("RegisterPage::regResult", installResult.data);
        navigate("/");
        alertDispatch(
          alertActions.success("Installation successful!", true, 6000)
        );
      }

      if (installResult.error) {
        dbg.log("install result got error");
        let message = "Please correct the errors";
        if (typeof installResult.error.data === "string") {
          message = installResult.error.data;
        } else if (installResult.error.data.isInstalled) {
          message = "This site has already been installed";
        }

        alertDispatch(alertActions.error(message, true));
      }
    }
  }, [installResult]);

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
    // const { nav, service } = this.props;
    // const errors = service.error ? service.error : {};
    // return (
    <ConnectedPage pageClass="page-signin">
      <div className="container">
        <div className="row justify-content-center">
          <div className="card col-md-8">
            <div className="card-body">
              <h1 className="card-title">Installation</h1>
              <p className="card-text">
                Before you can use this application please provide the following
                details
              </p>

              <form noValidate onSubmit={handleSubmit}>
                <h2>App details</h2>
                <div className="form-group">
                  <label htmlFor="appName">App name</label>
                  <input
                    type="appName"
                    className={`form-control ${
                      errors && errors.data.appName ? "is-invalid" : ""
                    }`}
                    id="appName"
                    aria-describedby="appNameHelp"
                    placeholder="Enter an app name"
                    value={formState.appName}
                    disabled
                  />
                  {errors && errors.data.appName && (
                    <div className="invalid-feedback">
                      {errors && errors.data.appName}
                    </div>
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
                        errors && errors.data.userFirstName ? "is-invalid" : ""
                      }`}
                      id="userFirstName"
                      placeholder="Enter first name"
                      value={formState.userFirstName}
                      onChange={handleOnChange}
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
                      className={`form-control ${
                        errors && errors.data.userLastName ? "is-invalid" : ""
                      }`}
                      id="userLastlName"
                      placeholder="Enter last name"
                      value={formState.userLastName}
                      onChange={handleOnChange}
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
                      className={`form-control ${
                        errors && errors.data.userEmail ? "is-invalid" : ""
                      }`}
                      id="userEmail"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      value={formState.userEmail}
                      onChange={handleOnChange}
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
                      className={`form-control ${
                        errors && errors.data.userPassword ? "is-invalid" : ""
                      }`}
                      id="userPassword"
                      placeholder="Password"
                      value={formState.userPassword}
                      onChange={handleOnChange}
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
                      className={`form-control ${
                        errors && errors.data.userPassword2 ? "is-invalid" : ""
                      }`}
                      id="userPassword2"
                      placeholder="Confirm Password"
                      value={formState.userPassword2}
                      onChange={handleOnChange}
                    />
                    {errors && errors.data.userPassword2 && (
                      <div className="invalid-feedback">
                        {errors && errors.data.userPassword2}
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
