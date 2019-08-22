import React from "react";
import ConnectedPage from "../../connected/templates/ConnectedPage";

export default function NotFound(props) {
  return (
    <ConnectedPage pageClass="page-not-found" nav={props.nav}>
      404 - Not Found
    </ConnectedPage>
  );
}
