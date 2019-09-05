import { dbg } from "../util/tools";
import { UserDevice } from "../models";

const saveNewDevice = async useragent => {
  const device = new UserDevice({
    os: useragent.os,
    browser: {
      name: useragent.browser,
      version: useragent.version
    },
    platform: useragent.platform
  });

  await device.save();

  return device;
};

export const setCookie = () => {
  return async (req, res, next) => {
    // check if client sent cookie
    var cookie = req.cookies._did;
    let device = null;
    if (cookie === undefined) {
      device = await saveNewDevice(req.useragent);

      res.cookie("_did", device.uuid, {
        maxAge: 900000,
        httpOnly: true
      });
    } else {
      device = await UserDevice.findOne({ uuid: cookie }).exec();

      if (!device) {
        device = await saveNewDevice(req.useragent);
      }
    }

    req.device = device;

    next();
  };
};
