import jwt_decode from "jwt-decode";

import { authConstants, usersConstants, serviceConstants } from "../constants";
import { authServices } from "../../services";
import { alertActions } from "../actions";
import { history, dbg, getAuthCookieToken } from "../../utils";

const setCurrentUser = user => {
  return { type: usersConstants.SET_CURRENT_USER, user };
};

const login = (username, password) => {
  return dispatch => {
    dispatch(request({ username }));

    authServices
      .login(username, password)
      .then(data => {
        dbg.log("authActions::login data", data);
        const token = getAuthCookieToken();
        dbg.log("authActions::login token", token);
        // Decode token to get user data
        if (token) {
          const decoded = jwt_decode(token);
          dispatch(success(decoded));
          dispatch(setCurrentUser(decoded));
        } else {
          throw new Error(
            "Unable to get credentials from server. Cookie probably not set, most likely because it had the wrong security setting."
          );
        }
        history.push("/admin");
      })
      .catch(error => {
        dbg.log("login error", error);
        dispatch(failure(error.data));
        dispatch(alertActions.error("There was an error signing in."));
      })
      .finally(() => {
        dispatch({ type: serviceConstants.POSTBACK_END });
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
      dispatch({ type: authConstants.LOGIN_SUCCESS, user });
    };
  }
  function failure(error) {
    return dispatch => {
      dispatch({ type: serviceConstants.POSTBACK_ERROR, error });
      dispatch({ type: authConstants.LOGIN_FAILURE, error });
    };
  }
};

const checkPrivileges = (resource, token) => {
  dbg.log("authActions::checkPrivileges starting...");
  return dispatch => {
    return authServices.isAuthorized(resource, token).then(
      user => {
        dbg.log("authActions::checkPrivileges isAuthorized", user);
        localStorage.setItem("user", JSON.stringify(user));
      },
      error => {
        dbg.log("authActions::checkPrivileges error", error);
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
    dispatch({ type: serviceConstants.POSTBACK_BEGIN });
    dispatch({ type: authConstants.LOGOUT_REQUEST });
    return authServices
      .logout()
      .then(result => {
        if (result === true) {
          dispatch({ type: authConstants.LOGOUT_SUCCESS });
          dispatch(setCurrentUser({}));

          history.push("/");
          dispatch(alertActions.info("You have signed out"));
        }
      })
      .catch(err => {
        dispatch({ type: authConstants.LOGOUT_FAILURE });
        dispatch({ type: serviceConstants.POSTBACK_ERROR, error: err });
      })
      .finally(() => {
        dispatch({ type: serviceConstants.POSTBACK_END });
      });
  };
};

export const authActions = {
  login,
  setCurrentUser,
  logout,
  checkPrivileges
};
