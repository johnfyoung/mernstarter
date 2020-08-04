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
  },
  submenu: {
    profile: {
      path: "/profile",
      label: "Profile",
      privilege: true,
    },
  },
};
