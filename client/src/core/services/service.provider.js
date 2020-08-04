import React from "react";
import { RequestProvider } from "react-request-hook";
import axios from "axios";

const axiosInstance = axios.create({
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

export default function ServiceProvider(props) {
  return <RequestProvider value={axiosInstance} {...props} />;
}
