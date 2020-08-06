import React, { useEffect } from "react";
import { useAlertContext, alertActions } from "../../../state";
import AlertAnimated from "../AlertAnimated";

export default function ConnectedAlerts() {
  const [alertState, alertDispatch] = useAlertContext();

  // useEffect(() => {
  //   const t = timeOut || alertState.timeOut || false;
  //   if (t) {
  //     setTimeout(() => alertDispatch(alertActions.clearAlert()), t);
  //   }
  // }, []);

  return (
    <div>
      {alertState.alerts &&
        alertState.alerts.map((alert) => (
          <AlertAnimated
            key={alert.id}
            isOn={!alert.expired ? true : false}
            type={alert.type}
            timeOut={
              typeof alert.timeOut === "boolean"
                ? alert.timeOut
                  ? 5000
                  : false
                : alert.timeOut
            }
            dismissable={alert.dimissable}
            onEnter={() => alertDispatch(alertActions.shown(alert.id))}
            onExited={() => alertDispatch(alertActions.hidden(alert.id))}
            onDismiss={() => alertDispatch(alertActions.clearAlert(alert.id))}
          >
            {alert.message || ""}
          </AlertAnimated>
        ))}
    </div>
  );
}
