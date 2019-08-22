import React from "react";
import Header from "../parts/Header";
import Footer from "../parts/Footer";

export default function Page({ pageClass, children, nav }) {
  return (
    <div className={`page ${pageClass}`}>
      <Header nav={nav} />
      <div className="container">
        {children}
        <Footer />
      </div>
    </div>
  );
}
