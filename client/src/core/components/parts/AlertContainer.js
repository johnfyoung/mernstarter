import React from "react";
import { Container, Row, Column } from "../layout";
import ConnectedAlerts from "../parts/ConnectedAlerts";

export function AlertContainer() {
  return (
    <Container className="mt-3">
      <Row>
        <Column>
          <ConnectedAlerts />
        </Column>
      </Row>
    </Container>
  );
}

export default AlertContainer;
