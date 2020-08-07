import React from "react";

export function Row({ children, className }) {
  return (
    <div className={`row${className ? ` ${className}` : ""}`}>{children}</div>
  );
}
