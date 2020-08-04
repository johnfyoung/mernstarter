import React, { useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import { useAlertContext, alertActions } from "../../state";

import Page from "./Page";
import Alert from "../parts/Alert";

export default function ConnectedPage({ pageClass, children, alert }) {
  const [alertState, alertDispatch] = useAlertContext();

  useEffect(() => {}, [alertState.alert]);

  console.log("alert", alertState);
  return (
    <Page pageClass={pageClass}>
      {alertState && alertState.alert && (
        <CSSTransition
          in={alertState && alertState.alert}
          classNames="alert"
          timeout="1000"
          unmountOnExit
          onEnter={() => alertDispatch(alertActions.shown())}
          onExit={() => alertDispatch(alertActions.hidden())}
        >
          <Alert
            type={alertState.alert.type}
            message={alertState.alert.message}
            show={true}
          />
        </CSSTransition>
      )}
      {children}
    </Page>
  );
}
