import express from "express";

const router = express.Router();

import { permissions, siteConfigs } from "../../config";
import { dbg, encrypt, getConfig, logError } from "../../util/tools";
import { isUserAuthorized } from "../../middleware";
import { User, Group } from "../../models";
import { validateUserRegistration } from "../../util/validation";

router.post("/register", async (req, res) => {
  const allowPublicRegsitration = await getConfig(
    siteConfigs.ALLOWPUBLICREGISTRATION
  );

  if (allowPublicRegsitration) {
    const { errors, isValid } = validateUserRegistration(req.body);

    // check validation
    if (!isValid) {
      dbg("User is invalid");
      return res.status(400).json(errors);
    }

    try {
      dbg("User is valid");
      const existingUser = await User.findOne({
        email: req.body.userEmail,
      }).exec();

      if (!existingUser) {
        const userGroup = await Group.findOne({ name: "users" }).exec();
        const encryptedPassword = encrypt(req.body.userPassword);

        const newUser = new User({
          firstName: req.body.userFirstName,
          lastName: req.body.userLastName,
          email: req.body.userEmail,
          password: encryptedPassword,
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
  } else {
    return res.status(403).send("Public registration is not allowed");
  }
});

router.get(
  "/",
  isUserAuthorized([permissions.users.all, permissions.users.view]),
  async (req, res, next) => {
    dbg("Auth'd for user list");
    try {
      const users = await User.find({});
      dbg("Users:", users);
      res.json(users);
    } catch (err) {
      await logError(`users::get error - ${err}`);
      return res.status(500);
    }
  }
);

export default router;
