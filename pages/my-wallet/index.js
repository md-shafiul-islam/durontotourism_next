import React, { Component } from "react";
import { Card, Col, Row } from "react-bootstrap";

class WalletPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col md={4}>
            <Card>
              <Card.Body></Card.Body>
            </Card>
          </Col>

          <Col md={8}>
            <Card>
              <Card.Body></Card.Body>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default WalletPage;
