import { permissionsConstants } from "../../core/state/constants/permissions.constants";
export const navConfig = {
  brand: {
    path: "/",
    label: process.env.REACT_APP_NAME,
  },
  hasSearch: false,
  menu: {
    home: {
      path: "/",
      label: "Home",
      privilege: false,
    },
    admin: {
      path: "/admin",
      label: "Admin",
      privilege: true,
    },
    users: {
      path: "/admin/users",
      label: "Users",
      privilege: true,
      permissions: [
        permissionsConstants.USERS_ALL,
        permissionsConstants.USERS_VIEW,
      ],
    },
  },
  submenu: {
    profile: {
      path: "/profile",
      label: "Profile",
      privilege: true,
    },
  },
};
