import express from "express";
import jwt from "jsonwebtoken";

import { User, Group } from "../../models";
import {
  dbg,
  compare,
  signToken,
  setTokenAsCookie,
  getSiteConfig,
} from "../../util/tools";
import { validateLoginInput } from "../../util/validation";
import { jwtCookies } from "../../config/constants";

const router = express.Router();
require("dotenv").config();

router.post("/authenticate", (req, res) => {
  dbg("req body", req.body);
  const { errors, isValid } = validateLoginInput(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // find user by email
  User.findOne({
    email,
  })
    .populate("groups")
    .then(async (user) => {
      // Check for user
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }

      // check password
      if (compare(password, user.password)) {
        // User matched
        const payload = {
          id: user.id,
          firstName: user.name,
          lastName: user.name,
          groups: user.groups,
        };

        // Check to see if this user is already associated with the requestion device
        if (
          !user.devices.some((d) => {
            return req.device._id.equals(d);
          })
        ) {
          try {
            user.devices.push(req.device);
            await user.save();
          } catch (err) {
            console.log("Error saving user with device change");
          }
        }

        // Sign the token
        const token = signToken(payload);

        // Setting the JWT in two cookies
        // // @see https://medium.com/lightrail/getting-token-authentication-right-in-a-stateless-single-page-application-57d0c6474e3
        // const tokenParts = token.split(".");
        // const tokenSignature = tokenParts.pop();

        // res.cookie(jwtCookies.HEADERPAYLOAD, tokenParts.join("."), {
        //   secure: process.env.COOKIE_SECURE === "false" ? false : true,
        //   expires: new Date(Date.now() + 30 * 60000),
        // });
        // res.cookie(jwtCookies.SIGNATURE, tokenSignature, {
        //   secure: process.env.COOKIE_SECURE === "false" ? false : true,
        //   httpOnly: true,
        // });

        setTokenAsCookie(
          token,
          res,
          jwtCookies.HEADERPAYLOAD,
          jwtCookies.SIGNATURE
        );

        return res.json({
          success: true,
          token: "Bearer " + token,
        });
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
});

/**
 * Unset the authentication by unsetting the auth cookies
 */
router.delete("/authenticate", (req, res) => {
  res.cookie(jwtCookies.HEADERPAYLOAD, "", {
    maxAge: 0,
    expires: Date.now(),
    overwrite: true,
  });
  res.cookie(jwtCookies.SIGNATURE, "", {
    maxAge: 0,
    expires: Date.now(),
    overwrite: true,
  });
  res.json({
    success: true,
  });
});

router.get("/authorize", (req, res) => {
  res.send("Hello from /api/auth/authorize");
});

export default router;
