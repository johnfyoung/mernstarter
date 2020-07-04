import jwt from "jsonwebtoken";
require("dotenv").config();

import { jwtCookies } from "../../config";

export const signToken = payload => {
    // Sign the token
    return jwt.sign(payload, process.env.SECRETKEY, {
        expiresIn: 3600
    });
};

export const verifyToken = token => {
    return jwt.verify(token, process.env.SECRETKEY);
};

/**
 * Setting the JWT in two cookies
 * @see https://medium.com/lightrail/getting-token-authentication-right-in-a-stateless-single-page-application-57d0c6474e3
 * @param {*} token 
 * @param {*} response 
 */
export const setTokenAsAuthCookie = (token, response) => {
    const tokenParts = token.split(".");
    const tokenSignature = tokenParts.pop();

    response.cookie(jwtCookies.HEADERPAYLOAD, tokenParts.join("."), {
        secure: process.env.COOKIE_SECURE === "false" ? false : true,
        expires: new Date(Date.now() + 30 * 60000)
    });
    response.cookie(jwtCookies.SIGNATURE, tokenSignature, {
        secure: process.env.COOKIE_SECURE === "false" ? false : true,
        httpOnly: true
    });
};

/**
 * Stitch together the bearer token from the cookies on the request
 * @param {*} request 
 */
export const getTokenFromAuthCookie = request => {
    if (request.cookies && request.cookies[jwtCookies.HEADERPAYLOAD] && request.cookies[jwtCookies.SIGNATURE]) {
        return request.cookies[jwtCookies.HEADERPAYLOAD] + "." + request.cookies[jwtCookies.SIGNATURE];
    }

    return null;
};

export const getPermissions = user => {
    return user.groups.reduce((accum, group) => {
        return [...accum, ...group.permissions]
    }, []).concat(user.permissions);
}


