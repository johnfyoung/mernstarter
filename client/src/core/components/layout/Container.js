import React from "react";

export function Container({ fluid, children, className }) {
  return (
    <div
      className={`container${fluid ? "-fluid" : ""}${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </div>
  );
}
