import React from "react";

export function Column({ children, width, sm, md, lg, className }) {
  return (
    <div
      className={`col-${width ? width : "12"}${
        className ? ` ${className}` : ""
      }${sm ? ` col-md-${sm}` : ""}${md ? ` col-md-${md}` : ""}${
        lg ? ` col-lg-${lg}` : ""
      }`}
    >
      {children}
    </div>
  );
}
