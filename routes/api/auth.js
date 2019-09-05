import express from "express";
import jwt from "jsonwebtoken";

import { User, Group } from "../../models";
import { dbg, compare } from "../../util/tools";
import { validateLoginInput } from "../../util/validation";

const router = express.Router();
require("dotenv").config();

router.post("/authenticate", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // find user by email
  User.findOne({
    email
  })
    .populate("groups")
    .then(async user => {
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
          groups: user.groups
        };

        if (!user.devices.some(device => device.id.equals(req.device.id))) {
          user.devices.push(req.device);
          await user.save();
        }

        // Sign the token
        const token = jwt.sign(payload, process.env.SECRETKEY, {
          expiresIn: 3600
        });

        return res.json({
          success: true,
          token: "Bearer " + token
        });
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
});

router.post("/authorize", (req, res) => {
  res.send("Hello from /api/auth/authorize");
});

export default router;
