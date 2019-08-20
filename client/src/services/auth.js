export default {
  isAuthorized: () => {
    const auth = localStorage.getItem("authorized");
    return auth === "true" ? true : false;
  },
  authenticate: (username, password) => {
    if (username === "john@john.com" && password === "password") {
      localStorage.setItem("authorized", "true");
      return true;
    }

    return false;
  },
  revoke: () => {
    localStorage.removeItem("authorized");
  }
};
