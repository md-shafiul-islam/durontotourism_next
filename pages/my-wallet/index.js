import React, { Component } from "react";
import Link from "next/link";
import { Breadcrumb, Card, Col, Nav, Row, Tab, Tabs } from "react-bootstrap";
import EmptyCont from "../../utils/helper/emptyCont";
import RechargeWallet from "../../components/payment-method/RechargeWallet";
import HowTopUpWallet from "../../components/wallet/HowTopUpWallet";
import WithDrawContent from "../../components/wallet/WithDrawContent";
import { getSession } from "next-auth/react";

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
                        <div className="title">My Wallet</div>
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
                <Tab.Container id="wallet" defaultActiveKey="transection">
                  <Row>
                    <Col sm={12} className="wallet-main-container">
                      <Nav variant="pills" className="flex-row">
                        <Nav.Item>
                          <Nav.Link eventKey="transection">
                            Transection History
                          </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                          <Nav.Link eventKey="myCash">Top Up My Wallet</Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                          <Nav.Link eventKey="accounts">
                            How to top-up my wallet
                          </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                          <Nav.Link eventKey="withdraw">Withdraw</Nav.Link>
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
                        <Tab.Pane eventKey="accounts">
                          <HowTopUpWallet />
                        </Tab.Pane>
                        <Tab.Pane eventKey="withdraw">
                          <WithDrawContent />
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

export async function getServerSideProps(context) {
  let session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: session,
  };
}



export default WalletPage;
