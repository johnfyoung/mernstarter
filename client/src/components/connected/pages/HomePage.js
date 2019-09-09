import React from "react";
import ConnectedPage from "../../connected/templates/ConnectedPage";

export default function HomePage(props) {
  return (
    <ConnectedPage pageClass="page-home" nav={props.nav}>
      <div className="row">
        <div className="col-12">Welcome!</div>
      </div>
    </ConnectedPage>
  );
}
