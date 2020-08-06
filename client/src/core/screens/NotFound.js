import React from "react";
import ConnectedPage from "../components/layout/ConnectedPage";

export default function NotFound(props) {
  return (
    <ConnectedPage pageClass="page-not-found" nav={props.nav}>
      <h1 style={{ fontSize: "4rem" }}>404 - Not Found</h1>
    </ConnectedPage>
  );
}
