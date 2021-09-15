import React, { Component } from "react";
import { Card, Col, Container, Nav, Row, Tab } from "react-bootstrap";
import CardPayment from "../../components/payment-method/CardPayment";
import WalletPayment from "../../components/payment-method/WalletPayment";
import EmptyCont from "../../utils/helper/emptyCont";

class PaymetPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col md={9}>
              <Row>
                <Col md={12} className="payment-method-area">
                  <Tab.Container
                    id="left-tabs-example"
                    defaultActiveKey="payGetway"
                  >
                    <Row>
                      <Col md={4} className="tab-menu-area">
                        <div className="paymet-title">
                          <h3>Payment Options</h3>
                        </div>
                        <Nav variant="pills" className="flex-column">
                          <Nav.Item>
                            <Nav.Link eventKey="payGetway">WALLET</Nav.Link>
                          </Nav.Item>

                          <Nav.Item>
                            <Nav.Link eventKey="mobileBanking">
                              Mobile Banking
                            </Nav.Link>
                          </Nav.Item>

                          <Nav.Item>
                            <Nav.Link eventKey="cardPay">
                              Credit/Debit/ATM Card
                            </Nav.Link>
                          </Nav.Item>

                          <Nav.Item>
                            <Nav.Link eventKey="emi">EMI</Nav.Link>
                          </Nav.Item>

                          <Nav.Item>
                            <Nav.Link eventKey="giftCard">
                              TripMoney, Gift Cards, Wallets & More
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </Col>
                      <Col md={8}>
                        <Tab.Content>
                          <Tab.Pane eventKey="payGetway">
                            <WalletPayment />
                          </Tab.Pane>
                          <Tab.Pane eventKey="mobileBanking">
                            <EmptyCont height="300px" />
                          </Tab.Pane>
                          <Tab.Pane eventKey="cardPay">
                            <CardPayment />
                          </Tab.Pane>
                          <Tab.Pane eventKey="emi">
                            <EmptyCont height="300px" />
                          </Tab.Pane>
                          <Tab.Pane eventKey="giftCard">
                            <EmptyCont height="300px" />
                          </Tab.Pane>
                        </Tab.Content>
                      </Col>
                    </Row>
                  </Tab.Container>
                </Col>
              </Row>
            </Col>
            <Col md={3}></Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default PaymetPage;
