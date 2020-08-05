import React from "react";

import "./style.scss";

export default function Alert({ type, message, show, onDismiss }) {
  return (
    <div className={`alert ${type} fade ${show ? "show" : ""}`}>
      {message}
      {onDismiss && (
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
