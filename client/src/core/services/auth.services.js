import React from "react";
import { useResource } from "react-request-hook";
import axios from "axios";
import { dbg } from "../utils";

export function useLoginService() {
  return useResource((email, password) => ({
    method: "post",
    url: "/api/auth/authenticate",
    data: { email, password },
    withCredentials: true,
  }));
}

export function useRegistrationService() {
  return useResource((data) => ({
    method: "post",
    url: "/api/users/register",
    data,
  }));
}

export const getRemoteConfig = async () => {
  try {
    await axios.get(`/api/auth/authorize`);
  } catch (ex) {
    dbg.log("getConfig error: ", ex);
  }
};
