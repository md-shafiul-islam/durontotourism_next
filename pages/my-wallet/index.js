import React, { Component } from "react";
import Link from "next/link";
import { Breadcrumb, Card, Col, Nav, Row, Tab, Tabs } from "react-bootstrap";
import EmptyCont from "../../utils/helper/emptyCont";
import RechargeWallet from "../../components/payment-method/RechargeWallet";

class WalletPage extends Component {
  render() {
    let { currency, amount } = this.props;
    return (
      <React.Fragment>
        <Row>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link href="/">
                <a>Home</a>
              </Link>{" "}
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link href="/my-wallet">
                <a>Wallet</a>
              </Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row>
          <Col md={4}>
            <Card className="wallet-card">
              <Card.Body className="wallet-sidebar">
                <div className="title-area">
                  <div className="amount">498489489</div>
                  <div className="sub-text">Wallet Balance</div>
                </div>

                <div className="cash-area">
                  <div className="my-cash">
                    <div className="icon-content">
                      <div className="icon">
                        {currency ? (
                          <span className="currency">{currency.code}</span>
                        ) : (
                          <span className="currency">&#2547;</span>
                        )}
                      </div>
                      <div className="badge-area">
                        <div className="title">My Cash</div>
                        <div className="badge">use unrestrictions</div>
                      </div>
                    </div>
                    <div className="amount-area">
                      <span className="amount">$8418</span>
                      {/**<span className="aks-text">How to earn?</span> */}
                    </div>
                  </div>
                  <div className="reward-bonus">
                    <div className="icon-content">
                      <div className="icon">
                        {currency ? (
                          <span className="currency">{currency.code}</span>
                        ) : (
                          <span className="currency">&#2547;</span>
                        )}
                      </div>
                      <div className="badge-area">
                        <div className="title">Reward Bonus</div>
                        <div className="badge">use with restrictions</div>
                      </div>
                    </div>
                    <div className="amount-area">
                      {currency ? (
                        <span className="amount">
                          {currency.code} {amount}
                        </span>
                      ) : (
                        <span className="amount">&#2547; 0.00</span>
                      )}
                      {/**
                        <span className="aks-text">
                        <Link href="/exm-earn">
                          <a>How to earn?</a>
                        </Link>
                      </span>
                      */}
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={8}>
            <Card>
              <Card.Body>
                <Tab.Container id="wallet" defaultActiveKey="myCash">
                  <Row>
                    <Col sm={12} className="wallet-main-container">
                      <Nav variant="pills" className="flex-row">
                        <Nav.Item>
                          <Nav.Link eventKey="myCash">My Cash</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="rewardBonus">
                            Reward Bonus
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="transection">
                           Transection History
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12}>
                      <Tab.Content>
                        <Tab.Pane eventKey="myCash">                          
                          <RechargeWallet />
                        </Tab.Pane>
                        <Tab.Pane eventKey="rewardBonus">
                          <EmptyCont height="500px" />
                        </Tab.Pane>
                      </Tab.Content>
                    </Col>
                  </Row>
                </Tab.Container>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default WalletPage;
