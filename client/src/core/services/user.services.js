import React from "react";
import { useResource } from "react-request-hook";
import axios from "axios";
import { dbg } from "../utils";

export function useGetUsersService() {
  return useResource(() => ({
    method: "get",
    url: "/api/users",
  }));
}
