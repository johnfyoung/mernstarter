import React from "react";
import ConnectedPage from "../components/layout/ConnectedPage";
import { useAlertContext, alertActions } from "../state";

export default function HomePage(props) {
  const [alertState, alertDispatch] = useAlertContext();
  return (
    <ConnectedPage pageClass="page-home">
      <div className="row">
        <div className="col-12">Welcome!</div>
        <div className="col-12">
          <button
            className="btn btn-primary"
            onClick={() =>
              alertDispatch(alertActions.success("Hi there!", true, true))
            }
          >
            Click me
          </button>
        </div>
      </div>
    </ConnectedPage>
  );
}
