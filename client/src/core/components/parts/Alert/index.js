import React, { Children } from "react";

export default function Alert({ type, show, onDismiss, dimissable, children }) {
  return (
    <div className={`alert ${type} fade ${show ? "show" : ""}`}>
      {children}
      {dimissable && (
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={onDismiss}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      )}
    </div>
  );
}
