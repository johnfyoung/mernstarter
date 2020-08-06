import React, { useEffect } from "react";
import ConnectedAlerts from "../parts/ConnectedAlerts";

import Page from "./Page";

export default function ConnectedPage({ pageClass, children }) {
  return (
    <Page pageClass={pageClass}>
      <ConnectedAlerts />
      {children}
    </Page>
  );
}
