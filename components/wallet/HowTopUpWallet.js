import React from "react";
import { Card, Col, Nav, Row, Tab } from "react-bootstrap";
import EmptyCont from "../../utils/helper/emptyCont";
import RechargeItems from "./topupItems/RechargeItems";

const HowTopUpWallet = (params) => {
  return (
    <React.Fragment>
      <Row>
        <Col md={12} className="recharg-option-nav">
          <Tab.Container id="rechargeOptions" defaultActiveKey="onlineTransfer">
            <Row>
              <Col sm={12}>
                <Nav variant="pills" className="flex-row">
                  <Nav.Item>
                    <Nav.Link eventKey="onlineTransfer">
                      Online Banking
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="cash">Cash</Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link eventKey="cheque">Cheque</Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link eventKey="mobileBank">Mobile Bank</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <Tab.Content>
                  <Tab.Pane eventKey="onlineTransfer">
                    <RechargeItems />
                  </Tab.Pane>
                  <Tab.Pane eventKey="mobileBank">
                    <RechargeItems />
                  </Tab.Pane>
                  <Tab.Pane eventKey="cash">
                    <RechargeItems />
                  </Tab.Pane>
                  <Tab.Pane eventKey="cheque">
                    <RechargeItems />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default HowTopUpWallet;
