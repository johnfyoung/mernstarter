import React from "react";
import Page from "../../presentation/Page";

export default function AdminPage(props) {
  return (
    <Page pageClass="page-admin" nav={props.nav}>
      Here is an admin page
    </Page>
  );
}
