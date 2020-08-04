import React from "react";
import { Router } from "@reach/router";
import AdminPage from "../../../core/screens/AdminPage";
import ProfilePage from "../../../core/screens/ProfilePage";

export const PrivateRoutes = function() {
  return (
    <Router>
      <AdminPage exact path="/admin" />
      <ProfilePage exact path="/profile" />
    </Router>
  );
};
