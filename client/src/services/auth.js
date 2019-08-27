import { dbg } from "../utils";
import axios from "axios";

/**
 * auth services
 *
 * This file is a stub
 */

const login = (email, password) => {
  return axios
    .post("/api/auth/authenticate", { email, password })
    .then(res => {
      dbg("authServices::login response", res);
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch(error => {
      dbg("authServices::login error", error);
      const err = Error("Authentication error");
      err.data = error.response.data;
      throw err;
    });
};

const isAuthorized = async (resource, token) => {
  dbg("authServices::isAuthorized", token);
  // emulate a service request
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (token === "fake token here") {
        const user = {
          username: "john@john.com",
          email: "john@john.com",
          name: "John Young",
          exp: Date.now() / 1000 + 60,
          token: "fake token here"
        };
        resolve(user);
      } else {
        reject(false);
      }
    }, 1000);
  }).then(result => result);
};

const logout = () => {
  localStorage.removeItem("user");
};

export const authServices = {
  login,
  logout,
  isAuthorized
};
