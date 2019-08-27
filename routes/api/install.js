import express from "express";
import mongoose from "mongoose";

const router = new express.Router();

import { dbg, asyncForEach, encrypt } from "../../util/tools";
import { validateInstallInput } from "../../util/validation";

import { User, Config, Group } from "../../models";
import { groups } from "../../config";

/**
 * @route   POST api/install
 * @desc    Install an app
 * @access  Public
 */
router.post("/", async (req, res) => {
  try {
    const isInstalledSetting = await Config.findOne({
      name: "isInstalled",
      value: true
    });

    if (isInstalledSetting) {
      return res.status(400).json({
        isInstalled: true,
        msg: "Site already installed"
      });
    }

    const { errors, isValid } = validateInstallInput(req.body);

    // check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  } catch (e) {
    dbg("Route::post::install/  validation", e);
    return res.status(500).send(e);
  }

  /*****************************************
   * Install the site
   */

  dbg("Route::post::install/ Installing!");
  try {
    await installConfig(req.body.appName);
    await installGroups();
    await installSuperUser(req.body);
    await setAsInstalled();
    res.status(200).send();
  } catch (err) {
    return res.status(500).send(err);
  }
});

/**
 * Danger! Danger! Danger!
 */
// router.delete("/install", (req, res) => {
//   mongoose.connection.collections["users"].drop(function(err) {
//     console.log("users dropped");
//   });

//   mongoose.connection.collections["settings"].drop(function(err) {
//     console.log("settings dropped");
//   });

//   mongoose.connection.collections["groups"].drop(function(err) {
//     console.log("groups dropped");
//   });

//   return res.status(204).json({
//     isInstalled: false
//   });
// });

/**
 * @route   GET api/install/isinstalled
 * @desc    check to see if an app is already installed
 * @access  Public
 */
router.get("/isinstalled", (req, res) => {
  Config.findOne({
    name: "isInstalled"
  }).then(setting => {
    if (setting) {
      return res.json({ isInstalled: true, details: setting.value });
    } else {
      return res.json({
        isInstalled: false
      });
    }
  });
});

/******************************************************************************
 * HELPER FUNCTIONS
 */

async function installConfig(appName) {
  /**
   * App Config
   */
  try {
    // Config: App Name
    const appNameConfig = new Config({
      name: "appName",
      value: appName
    });

    // Config: Allow public registration
    const registrationConfig = new Config({
      name: "publicRegistration",
      value: true
    });

    await appNameConfig.save();
    await registrationConfig.save();
  } catch (err) {
    console.log("Error saving site settings", err);
    throw new Error("Error saving site settings");
  }
}

async function installGroups() {
  /**
   * Default groups
   */
  try {
    await asyncForEach(groups, async ({ title, name, permissions }) => {
      const newGroup = new Group({
        title,
        name,
        permissions
      });

      await newGroup.save();
    });
  } catch (err) {
    console.log("Error saving default groups", err);
    throw new Error("Error saving the default groups");
  }
}

async function installSuperUser({
  userFirstName,
  userLastName,
  userEmail,
  userPassword
}) {
  dbg("userPassword", userPassword);
  const adminGroup = await Group.findOne({ name: "admins" });
  const encryptedPassword = encrypt(userPassword);

  const newUser = new User({
    firstName: userFirstName,
    lastName: userLastName,
    email: userEmail,
    password: encryptedPassword
  });

  newUser.groups.push(adminGroup);

  try {
    return await newUser.save();
  } catch (err) {
    console.log("Error saving the default user", err);
    throw new Error("Error saving the default user");
  }
}

async function setAsInstalled() {
  try {
    const installedConfig = new Config({
      name: "isInstalled",
      value: true
    });

    await installedConfig.save();
  } catch (err) {
    console.log("Error setting the site as installed", err);
    throw new Error("Error setting the site as installed");
  }
}

export default router;
