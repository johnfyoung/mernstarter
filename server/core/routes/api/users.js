import express from "express";

const router = express.Router();

import { permissions } from "../../config";
import { dbg, encrypt } from "../../util/tools";
import { isUserAuthorized } from "../../middleware";
import { User, Group } from "../../models";
import { validateUserRegistration } from "../../util/validation";

router.post("/register", async (req, res) => {
  const { errors, isValid } = validateUserRegistration(req.body);

  // check validation
  if (!isValid) {
    dbg("User is invalid");
    return res.status(400).json(errors);
  }

  try {
    dbg("User is valid");
    const existingUser = await User.findOne({
      email: req.body.userEmail
    }).exec();

    if (!existingUser) {
      const userGroup = await Group.findOne({ name: "users" }).exec();
      const encryptedPassword = encrypt(req.body.userPassword);

      const newUser = new User({
        firstName: req.body.userFirstName,
        lastName: req.body.userLastName,
        email: req.body.userEmail,
        password: encryptedPassword
      });

      newUser.groups.push(userGroup);
      await newUser.save();

      res.status(200).json(newUser);
    } else {
      res.status(409).send("Email already exists");
    }
  } catch (err) {
    dbg("problem registering", err);
    return res.status(500).json(err);
  }
});

router.get("/", (req, res, next) => { isUserAuthorized(req, res, next, [permissions.users.all, permissions.users.view]) }, async (req, res, next) => {
  res.status(200).send("Auth'd for user list");
});

export default router;
