import jwt from "jsonwebtoken";
require("dotenv").config();
import jwt_decode from "jwt-decode";

import { jwtCookies } from "../../config";

export const signToken = (payload, expires = 3600) => {
  // Sign the token
  return jwt.sign(payload, process.env.SECRETKEY, {
    expiresIn: expires,
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRETKEY);
};

export const getTokenPayload = (token) => {
  const decoded = jwt_decode(token);

  if (decoded) {
    return decoded;
  }
};

/**
 * Setting the JWT in two cookies
 * @see https://medium.com/lightrail/getting-token-authentication-right-in-a-stateless-single-page-application-57d0c6474e3
 *
 * @param {JWT} token
 * @param {Response} response
 * @param {string} headerCookieLabel
 * @param {string} signatureCookieLabel
 * @param {Number} expire amount in milliseconds to add to now
 */
export const setTokenAsCookie = (
  token,
  response,
  headerCookieLabel,
  signatureCookieLabel,
  expire = 60 * 60000
) => {
  const tokenParts = token.split(".");
  const tokenSignature = tokenParts.pop();

  response.cookie(headerCookieLabel, tokenParts.join("."), {
    secure: process.env.COOKIE_SECURE === "false" ? false : true,
    expires: new Date(Date.now() + expire),
  });
  response.cookie(signatureCookieLabel, tokenSignature, {
    secure: process.env.COOKIE_SECURE === "false" ? false : true,
    httpOnly: true,
  });
};

/**
 * Stitch together the bearer token from the cookies on the request
 * @param {*} request
 */
export const getTokenFromCookie = (
  request,
  headerCookieLabel,
  signatureCookieLabel
) => {
  if (
    request.cookies &&
    request.cookies[headerCookieLabel] &&
    request.cookies[signatureCookieLabel]
  ) {
    return (
      request.cookies[headerCookieLabel] +
      "." +
      request.cookies[signatureCookieLabel]
    );
  }

  return null;
};

export const getPermissions = (user) => {
  return user.groups
    .reduce((accum, group) => {
      return [...accum, ...group.permissions];
    }, [])
    .concat(user.permissions);
};
