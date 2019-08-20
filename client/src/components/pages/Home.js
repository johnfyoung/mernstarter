import React from "react";
import PageTemplate from "../templates/PageTemplate";

export default function Home(props) {
  return (
    <PageTemplate pageClass="page-home" nav={props.nav}>
      Hello home.
    </PageTemplate>
  );
}
