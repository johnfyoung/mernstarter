import { installServices } from "../../services";
import { installConstants, serviceConstants } from "../constants";
import { alertActions } from "../actions/alert.actions";
import { history } from "../../utils";

const install = payload => {
  return dispatch => {
    dispatch({ type: serviceConstants.POSTBACK_BEGIN });
    installServices
      .install(payload)
      .then(result => {
        dispatch({ type: installConstants.INSTALL_SUCCESSFUL });
        dispatch({ type: serviceConstants.POSTBACK_END });
        history.push("/");
        dispatch(alertActions.success("Installation successful"));
      })
      .catch(error => {
        dispatch({ type: serviceConstants.POSTBACK_ERROR, error: error.data });
        dispatch({ type: serviceConstants.POSTBACK_END });

        if (error.data.isInstalled) {
          history.push("/");
          dispatch(alertActions.info(error.data.msg));
        } else {
          dispatch(alertActions.error("There was an installation error."));
        }
      });
  };
};

const checkInstallation = () => {
  return dispatch => {
    dispatch({ type: serviceConstants.POSTBACK_BEGIN });
    installServices
      .checkInstallation()
      .then(result => {
        if (result === true) {
          dispatch({ type: installConstants.INSTALL_ISINSTALLED });
          if (history.location.pathname === "/install") {
            history.push("/");
            dispatch(alertActions.warn("Site is already installed!"));
          }
        } else {
          dispatch({ type: installConstants.INSTALL_NOTINSTALLED });
        }
      })
      .catch(error => {
        dispatch({ type: serviceConstants.POSTBACK_END });
        dispatch({ type: serviceConstants.POSTBACK_ERROR, error: error.data });
      });
  };
};

export const installActions = {
  install,
  checkInstallation
};
