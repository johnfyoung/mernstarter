export const permissions = {
  users: {
    all: "USERS_ALL",
    add: "USERS_ADD",
    edit: "USERS_EDIT",
    delete: "USERS_DELETE",
    view: "USERS_VIEW",
  },
  site: {
    all: "SITE_ALL",
    install: "SITE_INSTALL",
  },
  content: {
    all: "CONTENT_ALL",
    public: "CONTENT_PUBLIC",
  },
};

export const logLevels = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  VERBOSE: 3,
  DEBUG: 4,
  SILLY: 5,
};

export const jwtCookies = {
  HEADERPAYLOAD: "_au1",
  SIGNATURE: "_au2",
  SITEHEADERPAYLOAD: "_sc1",
  SITESIGNATURE: "_sc2",
};

export const siteConfigs = {
  CONFIGUPDATE: "configUpdate",
  APPNAME: "appName",
  ISINSTALLED: "isInstalled",
  ALLOWPUBLICREGISTRATION: "publicRegistration",
};
