import { permissions } from "./constants";

export const groups = [
  {
    title: "Administrators",
    name: "admins",
    permissions: [permissions.site.all]
  },
  {
    title: "Users",
    name: "users",
    permissions: [permissions.content.all]
  },
  {
    title: "Guests",
    name: "guests",
    permissions: [permissions.content.public]
  }
];
