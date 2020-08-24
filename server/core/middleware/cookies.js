import { jwtCookies, siteConfigs } from "../config/constants";
import {
  dbg,
  getTokenFromCookie,
  verifyToken,
  setTokenAsCookie,
  getTokenPayload,
  getSiteConfig,
  getConfig,
  signToken,
} from "../util/tools";
import { UserDevice } from "../models";

import moment from "moment";

const saveNewDevice = async (useragent) => {
  const device = new UserDevice({
    os: useragent.os,
    browser: {
      name: useragent.browser,
      version: useragent.version,
    },
    platform: useragent.platform,
  });

  await device.save();

  return device;
};

export const setCookie = () => {
  return async (req, res, next) => {
    await setDeviceIdCookie(req, res);
    await setSiteConfigCookie(req, res);
    next();
  };
};

const setDeviceIdCookie = async (req, res) => {
  // check if client sent cookie
  var cookie = req.cookies._did;
  let device = null;
  if (cookie === undefined) {
    device = await saveNewDevice(req.useragent);
  } else {
    device = await UserDevice.findOne({ uuid: cookie }).exec();

    if (!device) {
      device = await saveNewDevice(req.useragent);
    }
  }
  // set the device cookie expiration for 2 years of inactivity
  res.cookie("_did", device.uuid, {
    expires: new Date(Date.now() + 63072000 * 1000),
    httpOnly: true,
  });

  req.device = device;
};

const setSiteConfigCookie = async (req, res) => {
  let token = getTokenFromCookie(
    req,
    jwtCookies.SITEHEADERPAYLOAD,
    jwtCookies.SITESIGNATURE
  );

  const lastUpdate = await getConfig(siteConfigs.CONFIGUPDATE);

  if (token && verifyToken(token)) {
    const payload = getTokenPayload(token);
    if (
      payload &&
      moment(payload[siteConfigs.CONFIGUPDATE]).isBefore(moment(lastUpdate))
    ) {
      await _setSiteConfigCookie(req, res);
    }
  } else {
    await _setSiteConfigCookie(req, res);
  }
};

const _setSiteConfigCookie = async (req, res) => {
  const siteConfig = await getSiteConfig();
  const expireTimeinSeconds = 60 * 60 * 24 * 365;
  const token = signToken(siteConfig, expireTimeinSeconds);
  setTokenAsCookie(
    token,
    res,
    jwtCookies.SITEHEADERPAYLOAD,
    jwtCookies.SITESIGNATURE,
    expireTimeinSeconds * 1000
  );
};
