import React from "react";

export default function Announcement({ type, message }) {
  return <div className={`alert ${type} mb-0`}>{message}</div>;
}
