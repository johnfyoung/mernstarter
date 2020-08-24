import { Config } from "../../models";
import { siteConfigs } from "../../config/constants";
import { dbg } from "./dbg";
import { logError } from "./logging";
require("dotenv").config();

export const getConfig = async (name) => {
  try {
    const configItem = await Config.findOne({ name });

    if (configItem) {
      return configItem.value;
    } else {
      throw new Error("Config item not found");
    }
  } catch (ex) {}
};

export const getSiteConfig = async () => {
  const configs = {};
  for (const prop in siteConfigs) {
    configs[siteConfigs[prop]] = await getConfig(siteConfigs[prop]);
  }

  return configs;
};

export const setConfig = async (name, value) => {
  dbg("setConfig:: setting", name);
  try {
    const configItem = await Config.findOneAndUpdate(
      { name },
      { value },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    dbg("setConfig:: done ", configItem);
    await Config.findOneAndUpdate(
      { name: siteConfigs.CONFIGUPDATE },
      { value: new Date().toISOString() },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    if (configItem) {
      return configItem.value;
    }
  } catch (ex) {
    logError(`setConfig::Problem setting ${name}`, ex);
  }
};
