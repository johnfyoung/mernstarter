import React from "react";
import "./style.scss";

export function Announcement({ type, children, ...props }) {
  return (
    <div className={`alert ${type} mb-0 announcement`} {...props}>
      {children}
    </div>
  );
}

export default Announcement;
