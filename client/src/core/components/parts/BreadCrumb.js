import React, { Fragment } from "react";
import { Link } from "@reach/router";

export function BreadCrumb({ items, ...props }) {
  return (
    <nav aria-label="breadcrumb" {...props}>
      <ol className="breadcrumb">
        {items &&
          items.map((item, index) => (
            <Fragment key={index}>
              {index !== items.length - 1 ? (
                <li className="breadcrumb-item">
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ) : (
                <li className="breadcrumb-item active" aria-current="page">
                  {item.label}
                </li>
              )}
            </Fragment>
          ))}
      </ol>
    </nav>
  );
}

export default BreadCrumb;
