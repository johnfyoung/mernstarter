import React from "react";
import { useResource } from "react-request-hook";

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
