import { dbg } from "../utils";
import axios from "axios";

const register = user => {
  return axios
    .post("/api/users/register", user)
    .then(res => {
      dbg.log("usersServices::register response", res);
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch(error => {
      dbg.log("usersServices::register error", error.response);
      let err = null;
      switch (error.response.status) {
        case 400:
          err = Error("Please check your submission for errors");
          err.data = error.response.data;
          break;
        case 409:
          err = Error("A user with that email already exists");
          err.data = error.response.data;
          break;
        default:
          err = Error("A user registration error ocurred");
          err.data = error.response.data;
      }

      throw err;
    });
};

export const usersServices = {
  register
};
