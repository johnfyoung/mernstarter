require("dotenv").config();

import { jwtCookies } from "../config/constants";
import { signToken, verifyToken, getTokenFromAuthCookie, setTokenAsAuthCookie, dbg, getPermissions, logDeniedRequest } from "../util/tools";
import { User } from "../models";
import { permissions } from "../config";

const respondForbidden = (res, msg = "") => {
    return res.status(403).json({
        status: 403,
        message: `FORBIDDEN${msg ? ": " + msg : ""}`
    })
}

const respondUnauthorized = res => {
    return res.status(401).json({
        status: 401,
        message: 'UNAUTHORIZED'
    })
}

export const isUserAuthorized = async (req, res, next, requiredPerms) => {
    const token = getTokenFromAuthCookie(req);
    if (token) {
        try {
            var decoded = verifyToken(token);
            //console.log("Decoded", JSON.stringify(decoded, null, 2));
            const exp = new Date(decoded.exp * 1000);
            const now = new Date();
            if (exp.getTime() < now.getTime()) {
                logDeniedRequest({ req });
                return respondForbidden(res, "Expired");
            }
        } catch (err) {
            logDeniedRequest({ req });
            return respondForbidden(res, err);
        }

        try {
            const user = await User.findById(decoded.id).populate("groups");
            //dbg("User", JSON.stringify(user, null, 2));
            const perms = getPermissions(user);
            //dbg("perms", perms);
            // check for authorization
            requiredPerms.push(permissions.site.all);
            const allowedPerms = perms.filter(p => requiredPerms.includes(p));
            if (allowedPerms.length > 0) {
                next();
            } else {
                logDeniedRequest({ req });
                return respondUnauthorized(res);
            }
        } catch (err) {
            logDeniedRequest({ req });
            return respondForbidden(res, "No user");
        }

    } else {
        logDeniedRequest({ req });
        return respondForbidden(res, "No token");
    }
}