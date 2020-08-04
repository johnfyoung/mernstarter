import React from "react";

export default function Alert({ type, message, show, className }) {
  return (
    <div
      className={`alert ${type} alert-dismissible fade ${className} ${
        show ? "show" : ""
      }`}
    >
      {message}
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}
