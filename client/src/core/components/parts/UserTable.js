import React from "react";

export default function UserTable({ users }) {
  return (
    <table className={"table"}>
      <thead>
        <tr>
          <th>Avatar</th>
          <th>First</th>
          <th>Last</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {users &&
          users.map((u) => (
            <tr key={u._id}>
              <td></td>
              <td>{u.firstName}</td>
              <td>{u.lastName}</td>
              <td>{u.email}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
