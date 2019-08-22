import React from "react";
import ConnectedPage from "../../connected/templates/ConnectedPage";

export default function AdminPage(props) {
  return (
    <ConnectedPage pageClass="page-admin" nav={props.nav}>
      Here is an admin page
    </ConnectedPage>
  );
}
