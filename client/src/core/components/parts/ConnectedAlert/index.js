import React, { useEffect } from "react";
import { useAlertContext, alertActions } from "../../../state";
import AlertAnimated from "../AlertAnimated";

export default function ConnectedAlert({ timeOut, dismissable }) {
  const [alertState, alertDispatch] = useAlertContext();

  useEffect(() => {
    const t = timeOut || alertState.timeOut || false;
    if (t) {
      setTimeout(() => alertDispatch(alertActions.clearAlert()), t);
    }
  }, []);

  return (
    <AlertAnimated
      isOn={
        alertState && alertState.alert && !alertState.alert.expired
          ? true
          : false
      }
      type={alertState && alertState.alert && alertState.alert.type}
      onEnter={() => alertDispatch(alertActions.shown())}
      onExited={() => alertDispatch(alertActions.hidden())}
      onDismiss={
        dismissable ||
        (alertState && alertState.alert && alertState.alert.dismissable)
          ? () => alertDispatch(alertActions.clearAlert())
          : null
      }
    >
      {(alertState && alertState.alert && alertState.alert.message) || ""}
    </AlertAnimated>
  );
}
