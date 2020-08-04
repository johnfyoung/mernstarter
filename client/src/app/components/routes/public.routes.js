import React, { Fragment } from "react";
import { Router } from "@reach/router";
import HomePage from "../../../core/screens/HomePage";
import SignInPage from "../../../core/screens/SignInPage";
import InstallPage from "../../../core/screens/InstallPage";
import RegisterPage from "../../../core/screens/RegisterPage";

export const PublicRoutes = function() {
  return (
    <Fragment>
      <HomePage exact path="/" />
      {/* <SignInPage exact path="/signin" />
      <RegisterPage exact path="/register" />
      <InstallPage exact path="/install" /> */}
    </Fragment>
  );
};
