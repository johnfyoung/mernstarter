import React from "react";
import "./style.scss";

export default function Page({ pageClass, children, nav }) {
  return (
    <div className={`page ${pageClass}`}>
      <div className="container">{children}</div>
    </div>
  );
}
