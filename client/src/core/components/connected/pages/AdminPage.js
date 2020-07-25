import React from "react";
import { connect } from "react-redux";
import ConnectedPage from "../templates/ConnectedPage";

function AdminPage(props) {
  return (
    <ConnectedPage pageClass="page-admin" nav={props.nav}>
      <div className="row">
        <div className="col-12">
          <h1>Administration</h1>
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

export default connect(mapStateToProps)(AdminPage);
