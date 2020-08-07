import React from "react";
import { useResource } from "react-request-hook";

export function useInstallService() {
  return useResource((payload) => ({
    method: "post",
    url: "/api/install",
    data: payload,
  }));
}

export function useCheckInstallService() {
  return useResource(() => ({
    method: "get",
    url: "/api/install/isinstalled",
  }));
}
