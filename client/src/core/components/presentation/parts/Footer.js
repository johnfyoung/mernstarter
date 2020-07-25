import React from "react";
require("dotenv").config();

export default function Footer() {
  const year = new Date().getFullYear();
  return <footer className="footer-bottom">Copyright &copy; {year} {process.env.REACT_APP_AUTHOR}</footer>;
}
