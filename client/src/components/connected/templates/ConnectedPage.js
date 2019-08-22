import React from "react";
import { connect } from "react-redux";

import Page from "../../presentation/templates/Page";
import Alert from "../../presentation/parts/Alert";

const ConnectedPage = ({ pageClass, children, nav, alert }) => {
  return (
    <Page pageClass={pageClass} nav={nav}>
      {alert && <Alert type={alert.type} message={alert.message} />}
      {children}
    </Page>
  );
};

const mapStateToProps = ({ alert }) => ({
  alert: alert.alert
});

export default connect(mapStateToProps)(ConnectedPage);
