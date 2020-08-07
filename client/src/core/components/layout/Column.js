import React from "react";

export function Column({ children, width, md, lg, className }) {
  return (
    <div
      className={`col-${width ? width : "12"}${
        className ? ` ${className}` : ""
      }${md ? ` col-md-${md}` : ""}${lg ? ` col-lg-${lg}` : ""}`}
    >
      {children}
    </div>
  );
}
