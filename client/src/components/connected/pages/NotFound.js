import React from "react";
import Page from "../../presentation/Page";

export default function NotFound(props) {
  return (
    <Page pageClass="page-not-found" nav={props.nav}>
      404 - Not Found
    </Page>
  );
}
