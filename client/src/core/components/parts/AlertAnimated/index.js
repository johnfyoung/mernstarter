import React, { useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import Alert from "../Alert";

import "./style.scss";
export default function AlertAnimated({
  isOn,
  timeOut,
  type,
  dimissable,
  onDismiss,
  children,
  ...props
}) {
  useEffect(() => {
    if (timeOut) {
      setTimeout(onDismiss, timeOut);
    }
  }, [isOn]);

  return (
    <CSSTransition
      in={isOn}
      classNames="alertTrans"
      timeout={300}
      unmountOnExit
      {...props}
    >
      <Alert type={type} show={true} dimissable onDismiss={onDismiss}>
        {children}
      </Alert>
    </CSSTransition>
  );
}
