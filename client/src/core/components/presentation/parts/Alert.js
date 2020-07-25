import React from "react";

export default function Alert({ type, message }) {
  return <div className={`alert ${type}`}>{message}</div>;
}
