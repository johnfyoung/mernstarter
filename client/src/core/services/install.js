import { dbg } from "../utils";
import axios from "axios";

const install = payload => {
  return axios
    .post("/api/install", payload)
    .then(response => {
      dbg.log("install.services::install - installed", response);
      return true;
    })
    .catch(error => {
      dbg.log("install.services::install - not installed", error.response.data);
      const err = Error("Installation error");
      err.data = error.response.data;
      throw err;
    });
};

const checkInstallation = () => {
  return axios
    .get("/api/install/isinstalled")
    .then(response => {
      if (response.data.isInstalled) {
        dbg.log("install.services::checkInstallation - installed", response);
        return true;
      } else {
        dbg.log("install.services::checkInstallation - not installed", response);
        return false;
      }
    })
    .catch(error => {
      const err = Error("Check installation error");
      err.data = error.response.data;
      throw err;
    });
};

export const installServices = {
  install,
  checkInstallation
};
