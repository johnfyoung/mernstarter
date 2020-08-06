import React, { Fragment } from "react";
import { Link } from "@reach/router";
import { dbg } from "../../utils";

export default function CoreNav({ nav, authenticated, handleSignOut }) {
  const { brand, menu, submenu, hasSearch } = nav;
  dbg.log("Nav:: authenticated", authenticated);
  dbg.log("Nav:: Menu", menu);
  //dbg.log("Props", props);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {brand && (
        <Link className="navbar-brand" to={brand.path}>
          {brand.label}
        </Link>
      )}
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {menu &&
            Object.keys(menu).map((key) => {
              if (
                !menu[key].privilege ||
                (menu[key].privilege && authenticated)
              ) {
                return (
                  <li
                    key={key}
                    className={`nav-item ${menu[key].active ? "active" : ""}`}
                  >
                    <Link className="nav-link" to={menu[key].path}>
                      {menu[key].label}
                      {menu[key].active ? (
                        <span className="sr-only">(current)</span>
                      ) : (
                        ""
                      )}
                    </Link>
                  </li>
                );
              }
              return "";
            })}
        </ul>
        {hasSearch && (
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        )}
        {authenticated ? (
          <Fragment>
            {submenu ? (
              <ul className="navbar-nav ml-auto">
                {Object.keys(submenu).map((key) => {
                  return (
                    <li className="nav-item">
                      <Link className="nav-link" to={submenu[key].path}>
                        {submenu[key].label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              ""
            )}
            {/* <li className='nav-item d-flex align-items-center'>
                <span className='text-light'>{user.name}</span>
                <img src={user.avatar} alt={`Avatar for ${user.name}`} className='rounded-circle mx-2' style={{ width: '35px' }} title='You must have a gravatar connected to your email to have an image' />
            </li> */}

            <button
              className="btn btn-outline-primary my-2 my-sm-0"
              type="submit"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </Fragment>
        ) : (
          <Link className="btn btn-outline-primary my-2 my-sm-0" to="/signin">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
