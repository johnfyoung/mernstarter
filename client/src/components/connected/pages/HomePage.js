import React from "react";
import Page from "../../presentation/Page";

export default function HomePage(props) {
  return (
    <Page pageClass="page-home" nav={props.nav}>
      Hello home.
    </Page>
  );
}
