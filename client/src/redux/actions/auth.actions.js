import { authConstants, usersConstants, serviceConstants } from "../constants";
import { authServices } from "../../services";
import { alertActions } from "../actions";
import { history } from "../../utils";
import { dbg } from "../../utils";

const setCurrentUser = user => {
  return { type: usersConstants.SET_CURRENT_USER, user };
};

const login = (username, password) => {
  return dispatch => {
    dispatch(request({ username }));

    authServices
      .login(username, password)
      .then(user => {
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(success(user));
        dispatch(setCurrentUser(user));
        history.push("/admin");
      })
      .catch(error => {
        dispatch(failure(error.data));
        dispatch(alertActions.error("There was an error signing in."));
      });
  };

  function request(user) {
    return dispatch => {
      dispatch({ type: authConstants.LOGIN_REQUEST, user });
      dispatch({ type: serviceConstants.POSTBACK_BEGIN });
    };
  }
  function success(user) {
    return dispatch => {
      dispatch({ type: serviceConstants.POSTBACK_END });
      dispatch({ type: authConstants.LOGIN_SUCCESS, user });
    };
  }
  function failure(error) {
    return dispatch => {
      dispatch({ type: serviceConstants.POSTBACK_END });
      dispatch({ type: serviceConstants.POSTBACK_ERROR, error });
      dispatch({ type: authConstants.LOGIN_FAILURE, error });
    };
  }
};

const checkPrivileges = (resource, token) => {
  dbg("authActions::checkPrivileges starting...");
  return dispatch => {
    return authServices.isAuthorized(resource, token).then(
      user => {
        dbg("authActions::checkPrivileges isAuthorized", user);
        localStorage.setItem("user", JSON.stringify(user));
      },
      error => {
        dbg("authActions::checkPrivileges error", error);
        dispatch(failure(error.toString()));
        dispatch(alertActions.error("Please sign in for access"));
        history.push("/signin");
      }
    );
  };

  function failure(error) {
    return { type: authConstants.AUTH_FAILURE, error };
  }
};

const logout = () => {
  return dispatch => {
    localStorage.removeItem("user");

    dispatch(setCurrentUser({}));
    history.push("/");
    dispatch(alertActions.info("You have signed out"));
  };
};

export const authActions = {
  login,
  setCurrentUser,
  logout,
  checkPrivileges
};
