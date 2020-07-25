import React from "react";
import { connect } from "react-redux";
import ConnectedPage from "../templates/ConnectedPage";

function ProfilePage(props) {
  return (
    <ConnectedPage pageClass="page-admin" nav={props.nav}>
      <div className="row">
        <div className="col-sm-6">
          <div className="card ">
            <div className="card-header">Your permissions</div>
            <div className="card-body">
              <ul>
                {props.permissions.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ConnectedPage>
  );
}

const mapStateToProps = ({ auth }) => ({
  permissions:
    auth.user && auth.user.groups
      ? auth.user.groups.reduce((accum, g) => accum.concat(g.permissions), [])
      : [],
});

export default connect(mapStateToProps)(ProfilePage);
