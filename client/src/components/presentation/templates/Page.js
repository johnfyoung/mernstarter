import React from "react";

export default function Page({ pageClass, children, nav }) {
  return (
    <div className={`page ${pageClass}`}>
      <div className="container">{children}</div>
    </div>
  );
}
