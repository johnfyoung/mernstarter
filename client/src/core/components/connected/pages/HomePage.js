import React from "react";
import ConnectedPage from "../templates/ConnectedPage";

export default function HomePage(props) {
  return (
    <ConnectedPage pageClass="page-home" nav={props.nav}>
      <div className="row">
        <div className="col-12">Welcome!</div>
      </div>
    </ConnectedPage>
  );
}
