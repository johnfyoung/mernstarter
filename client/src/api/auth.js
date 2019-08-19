export default {
    isAuthorized: () => {
        const auth = localStorage.getItem("authorized");
        return (auth === "true" ? true : false);
    },
    authenticate: (username, password) => {
        if (username === "john@john.com" && password === "password") {
            localStorage.setItem("authorized", "true");
        }
    },
    authorize: () => {
        localStorage.setItem("authorized", "false");
    },
    revoke: () => {
        localStorage.removeItem("authorized");
    }
};