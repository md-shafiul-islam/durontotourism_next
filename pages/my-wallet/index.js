import React, { Component } from "react";
import Link from "next/link";
import { Breadcrumb, Card, Col, Nav, Row, Tab, Tabs } from "react-bootstrap";
import RechargeWallet from "../../components/payment-method/RechargeWallet";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import HowTopUpWallet from "../../components/wallet/HowTopUpWallet";
import WithDrawContent from "../../components/wallet/WithDrawContent";
import { getSession } from "next-auth/react";
import WalletTransactionList from "../../components/payment-method/WalletTransactionList";
import { getWalletAction } from "../../redux/actions/WalletAction";
import WalletSidebar from "../../components/payment-method/WalletSidebar";

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
            <WalletSidebar wallet={this.props.wallet} currency = {currency} />
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

                        <Tab.Pane eventKey="transection" >
                          <WalletTransactionList />
                        </Tab.Pane>
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

WalletPage.prototypes = {
  getWalletAction: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  wallet: PropTypes.object.isRequired,
};

const mapStateToProps = (state)=>{
  return{
    wallet:state.wallet.wallet
  }
}

export default connect(mapStateToProps, {getWalletAction})(WalletPage);
