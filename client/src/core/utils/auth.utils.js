import axios from "axios";
import { authConstants } from "../redux/constants";
import { authServices } from "../services";

export const getCookie = name => {
  var v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return v ? v[2] : null;
};

export const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const setRequestedWithHeader = () => {
  axios.defaults.headers.common["X-Requested-With"] = "XmlHttpRequest";
};

export const getAuthCookieToken = () => {
  return getCookie(authConstants.AUTH_COOKIE_HEADERPAYLOAD);
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

export const setCSRFInterceptor = () => {
  // Apply to every request
  return axios.interceptors.request.use(req => {
    const csrfToken = getCookie("_csrf");
    console.log("request", req);

    if (req.method === "post") {
      req.data._csrf = csrfToken;
    }

    return req;
  });
};

export const setCSRFResponseInterceptor = () => {
  // Apply to every request
  return axios.interceptors.response.use(res => {
    console.log("response", res);

    return res;
  });
};

export const removeCSRFInterceptor = interceptor => {
  axios.interceptors.request.eject(interceptor);
};
