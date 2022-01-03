import React, { useEffect } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { useSession } from "next-auth/react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import {
  getAllWalletFlow,
  getWalletDeposits,
  getWalletWithdraws,
} from "../../redux/actions/WalletAction";
import WalletDetailsCard from "./WalletDetailsCard";
import WalletDepositsCard from "./WalletDepositsCard";
import WalletWithdrawCard from "./WalletWithdrawCard";
import { setJWTToken } from "../../redux/actions/jwtTokenAction";
import { initialJwTokenToAuth } from "../../redux/actions/initialAction";
const WalletTransactionList = (params) => {
  const { status, data } = useSession();
  useEffect(() => {

    if (status === "authenticated") {
      console.log("WalletTransactionList, geting data ...", data);
      setJWTToken(data.accessToken);
      initialJwTokenToAuth(data.accessToken);
      params.getWalletDeposits();
      params.getWalletWithdraws();
      params.getAllWalletFlow();
    }
  }, [status]);

  return (
    <React.Fragment>
      <Row>
        <Col md={12} className="recharg-option-nav">
          <Tab.Container id="rechargeOptions" defaultActiveKey="details">
            <Row>
              <Col sm={12}>
                <Nav variant="pills" className="flex-row">
                  <Nav.Item>
                    <Nav.Link eventKey="details">
                      Wallets Transection details
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="deposits">Deposits</Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link eventKey="withdarws">Withdraws</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <Tab.Content>
                  <Tab.Pane eventKey="details">
                    <WalletDetailsCard
                      details={params.walletFlow}
                      getAllWalletFlow={params.getAllWalletFlow}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="deposits">
                    <WalletDepositsCard
                      deposit={params.walletDeposit}
                      getWalletDeposits={params.getWalletDeposits}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="withdarws">
                    <WalletWithdrawCard
                      withdraw={params.walletWithdraw}
                      getWalletWithdraws={params.getWalletWithdraws}
                    />
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
WalletTransactionList.prototypes = {
  getAllWalletFlow: PropTypes.func.isRequired,
  getWalletWithdraws: PropTypes.func.isRequired,
  getWalletDeposits: PropTypes.func.isRequired,
  walletWithdraw: PropTypes.object.isRequired,
  walletDeposit: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  walletFlow: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  return {
    walletDeposit: state.wallet.walletDeposit,
    walletWithdraw: state.wallet.walletWithdraw,
    walletFlow: state.wallet.walletFlow,
  };
};

export default connect(mapStateToProps, {
  getWalletWithdraws,
  getAllWalletFlow,
  getWalletDeposits,
})(WalletTransactionList);
