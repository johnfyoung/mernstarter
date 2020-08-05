import React, { useEffect } from "react";
import ConnectedAlert from "../parts/ConnectedAlert";

import Page from "./Page";

export default function ConnectedPage({ pageClass, children }) {
  return (
    <Page pageClass={pageClass}>
      <ConnectedAlert />
      {children}
    </Page>
  );
}
