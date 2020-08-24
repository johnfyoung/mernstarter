import React from "react";

export function Card({ head, title, children, cta, url, md, lg }) {
  return (
    <div className={`col-md-${md ? md : 12} col-lg-${lg ? lg : 12}`}>
      <div className={`card`}>
        {head && <div className="card-header">{head}</div>}
        <div className="card-body">
          {title && <h5 className="card-title">{title}</h5>}
          <div className="card-text">{children}</div>
          {cta && (
            <a href={url} className="btn btn-primary">
              {cta}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
