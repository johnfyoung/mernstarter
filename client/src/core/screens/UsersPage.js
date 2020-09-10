import React, { useEffect } from "react";
import ConnectedPage from "../components/layout/ConnectedPage";

import { useGetUsersService } from "../services";
import { dbg } from "../utils";

export default function UsersPage(props) {
  const [usersResult, getUsers] = useGetUsersService();
  const { isLoading, data: users, error } = usersResult;

  useEffect(() => {
    if (!users) {
      dbg.log("Getting users");
      getUsers();
    }
  }, []);

  useEffect(() => {
    if (users) {
      dbg.log("users", users);
    }
  }, [users]);

  return (
    <ConnectedPage pageClass="page-admin">
      <div className="row">
        <div className="col-12">
          <h1>User Administration</h1>
          {!isLoading && users ? <div>Got Users</div> : <div>Loading...</div>}
          {error && <div>Got an error</div>}
        </div>
      </div>
    </ConnectedPage>
  );
}
