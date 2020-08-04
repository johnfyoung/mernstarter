import React from "react";
import ConnectedPage from "../components/layout/ConnectedPage";

export default function ProfilePage(props) {
  return (
    <ConnectedPage pageClass="page-admin">
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
