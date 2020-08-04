import React from "react";
import ConnectedPage from "../components/layout/ConnectedPage";

export default function HomePage(props) {
  return (
    <ConnectedPage pageClass="page-home">
      <div className="row">
        <div className="col-12">Welcome!</div>
      </div>
    </ConnectedPage>
  );
}
