import { usersConstants, serviceConstants } from "../constants";
import { alertActions } from "../actions";
import { usersServices } from "../../services";
import { dbg } from "../../utils";

const register = user => {
  return dispatch => {
    dispatch({ type: serviceConstants.POSTBACK_BEGIN });
    dispatch(alertActions.clearAlert());
    usersServices
      .register(user)
      .then(response => {
        dispatch({
          type: usersConstants.REGISTER_USER_SUCCESS,
          user: response
        });
        dispatch(alertActions.success("Registration successful"));
        dispatch({ type: serviceConstants.POSTBACK_END });
      })
      .catch(error => {
        dbg("usersActions::register error ", error.message);
        dispatch(alertActions.error(error.message));
        dispatch({ type: serviceConstants.POSTBACK_END });
        dispatch({ type: serviceConstants.POSTBACK_ERROR, error: error.data });
        dispatch({
          type: usersConstants.REGISTER_USER_FAILURE,
          error: error.data
        });
      });
  };
};

export const usersActions = {
  register
};
