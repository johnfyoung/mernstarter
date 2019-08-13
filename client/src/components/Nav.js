import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav({ nav }) {
    const { brand, menu, active } = nav;
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {brand && (<Link className="navbar-brand" to={brand.path}>{brand.label}</Link>)}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    {menu && Object.keys(menu).map((key) => (
                        <li key={key} className={`nav-item ${active === key ? "active" : ""}`}>
                            <Link className="nav-link" to={menu[key].path}>{menu[key].label}{active === key ? (<span className="sr-only">(current)</span>) : ""}</Link>
                        </li>
                    ))}
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
    )
}
