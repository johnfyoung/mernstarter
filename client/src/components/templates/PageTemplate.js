import React from "react";
import Header from "../parts/Header";
import Footer from "../parts/Footer";

import "../../resources/scss/PageTemplate.scss";

export default function PageTemplate({ pageClass, children, nav }) {
  return (
    <div className={`page-template ${pageClass}`}>
      <Header nav={nav} />

      {children}
      <Footer />
    </div>
  );
}
