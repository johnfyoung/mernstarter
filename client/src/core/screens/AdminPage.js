import React from "react";
import ConnectedPage from "../components/layout/ConnectedPage";

export default function AdminPage(props) {
  return (
    <ConnectedPage pageClass="page-admin">
      <div className="row">
        <div className="col-12">
          <h1>Administration</h1>
        </div>
      </div>
    </ConnectedPage>
  );
}
