import axios from "axios";
import jwt_decode from "jwt-decode";
import { authConstants } from "../state";
import { dbg } from "./log.utils";

import { getRemoteConfig } from "../services";

export const getCookie = (name) => {
  var v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return v ? v[2] : null;
};

export const setCookie = (name, value, days) => {
  var d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
  document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
};

export const deleteCookie = (name) => {
  setCookie(name, "", -1);
};

export const setAuthToken = (token) => {
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

// export const getAuthCookieToken = () => {
//   return getCookie(authConstants.AUTH_COOKIE_HEADERPAYLOAD);
// };

export const getTokenPayload = (cookieName) => {
  const token = getCookie(cookieName);
  if (token) {
    const decoded = jwt_decode(token);

    if (decoded) {
      return decoded;
    }
  }

  return null;
};

export const getSession = () => {
  const payload = getTokenPayload(authConstants.AUTH_COOKIE_HEADERPAYLOAD);
  // check for expired token
  const currentTime = Date.now() / 1000;
  if (payload && payload.exp > currentTime) {
    return payload;
  }

  return null;
};

export const getConfig = async () => {
  await getRemoteConfig();
  return getTokenPayload(authConstants.SITE_COOKIE_HEADERPAYLOAD);
};

export const getPermissions = () => {
  const session = getSession();
  return session.groups.reduce((accum, g) => accum.concat(g.permissions), []);
};

/**
 * TODO: in development
 * @param {*} resource
 */
// export const checkPrivileges = async (resource) => {
//   dbg.log("checkPrivileges::");
//   const user = localStorage.getItem("user");
//   if (user) {
//     dbg.log("checkPrivileges:: got a user");
//     const result = await authServices.isAuthorized(resource, user.token);
//     return result;
//   }

//   dbg.log("checkPrivileges:: no user");
//   return false;
// };

export const setCSRFInterceptor = () => {
  // Apply to every request
  return axios.interceptors.request.use((req) => {
    const csrfToken = getCookie("_csrf");
    dbg.log("request", req);

    if (req.method === "post") {
      req.data._csrf = csrfToken;
    }

    return req;
  });
};

export const setCSRFResponseInterceptor = () => {
  // Apply to every request
  return axios.interceptors.response.use((res) => {
    dbg.log("response", res);

    return res;
  });
};

export const removeCSRFInterceptor = (interceptor) => {
  axios.interceptors.request.eject(interceptor);
};
