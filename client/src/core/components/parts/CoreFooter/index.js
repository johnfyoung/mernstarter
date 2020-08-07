import React from "react";
import "./style.scss";

require("dotenv").config();

export function CoreFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer-bottom">
      Copyright &copy; {year} {process.env.REACT_APP_AUTHOR}
    </footer>
  );
}

export default CoreFooter;
