import axios from "axios";
import { authServices } from "../services";

/**
 * @param {*} token
 */
export const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

/**
 * TODO: in development
 * @param {*} resource
 */
export const checkPrivileges = async resource => {
  console.log("checkPrivileges::");
  const user = localStorage.getItem("user");
  if (user) {
    console.log("checkPrivileges:: got a user");
    const result = await authServices.isAuthorized(resource, user.token);
    return result;
  }

  console.log("checkPrivileges:: no user");
  return false;
};
