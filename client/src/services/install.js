import { dbg } from "../utils";
import axios from "axios";

const install = payload => {
  return axios
    .post("/api/install", payload)
    .then(response => {
      dbg("install.services::install - installed", response);
      return true;
    })
    .catch(error => {
      dbg("install.services::install - not installed", error.response.data);
      const err = Error("Installation error");
      err.data = error.response.data;
      throw err;
    });
};

export const installServices = {
  install
};
