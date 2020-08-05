import React from "react";
import { CSSTransition } from "react-transition-group";
import { useAlertContext, alertActions } from "../../../state";
import Alert from "../Alert";

export default function ConnectedAlert() {
  const [alertState, alertDispatch] = useAlertContext();

  return (
    <CSSTransition
      in={
        alertState && alertState.alert && !alertState.alert.expired
          ? true
          : false
      }
      classNames="alertTrans"
      timeout={300}
      unmountOnExit
      onEnter={() => alertDispatch(alertActions.shown())}
      onExited={() => alertDispatch(alertActions.hidden())}
    >
      <Alert
        type={alertState && alertState.alert && alertState.alert.type}
        message={
          (alertState && alertState.alert && alertState.alert.message) || ""
        }
        show={true}
        onDismiss={() => alertDispatch(alertActions.clearAlert())}
      />
    </CSSTransition>
  );
}
