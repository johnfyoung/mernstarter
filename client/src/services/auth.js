import { dbg } from "../utils";

/**
 * auth services
 *
 * This file is a stub
 */

const login = (username, password) => {
  // emulate a remote service
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      if (username === "john@john.com" && password === "password") {
        const user = {
          username: "john@john.com",
          email: "john@john.com",
          name: "John Young",
          exp: Date.now() / 1000 + 60,
          token: "fake token here"
        };

        resolve(user);
      } else {
        reject("This user and password combination does not exist");
      }
    }, 1000);
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
