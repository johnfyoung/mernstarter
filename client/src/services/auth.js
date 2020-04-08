import { dbg } from "../utils";
import axios from "axios";

/**
 * Authenticates a user
 *
 * Authentication sets two cookies. One cookie is a JWT header and payload. The other is the JWT signature. The signature is accessible httponly.
 * @param {*} email
 * @param {*} password
 */
const login = (email, password) => {
  return axios
    .post(
      "/api/auth/authenticate",
      { email, password },
      { withCredenitals: true }
    )
    .then(res => {
      dbg.log("authServices::login response", res);
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch(error => {
      dbg.log("authServices::login error", error);
      const err = Error("Authentication error");
      err.data = error.response.data;
      throw err;
    });
};

/**
 * Check to see if a user is authorized for a resource
 *
 * @todo under development
 * @param {*} resource
 */
const isAuthorized = async resource => {
  return axios
    .get("/api/auth/authorize", { params: { resource } })
    .then(res => {
      dbg.log("authServices::isAuthorized response", res);
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch(err => {
      if (err.status === 401) {
        throw new Error("Unauthorized");
      }
    });
};

/**
 * Logout - tell the service to unset the auth cookies (one of which is httponly)
 */
const logout = () => {
  return axios
    .delete("/api/auth/authenticate")
    .then(res => {
      dbg.log("authServices::logout res.data", res.data);
      return res.data.success;
    })
    .catch(err => {
      throw new Error("Unexpected error logging out.");
    });
};

export const authServices = {
  login,
  logout,
  isAuthorized
};
