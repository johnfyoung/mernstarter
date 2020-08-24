import { logError, dbg, asyncForEach, setConfig } from "../util/tools";
import { Config } from "../models";

const setSiteConfig = async (name, value) => {
  return await setConfig(name, value);
};

export const ConfigController = {
  setSiteConfig,
};
