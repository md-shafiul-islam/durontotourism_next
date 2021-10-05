import React, { useEffect, useState } from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import RechargeItems from "./topupItems/RechargeItems";
import {
  getBnakAccounts,
  getMobillBnakAccounts,
} from "../../redux/actions/rechargeAction";



const HowTopUpWallet = (params) => {
  // const [mobileBanks, setMobileBanks] = useState([]);
  // const [banks, setBanks] = useState([]);

  useEffect(() => {
    params.getBnakAccounts();
    params.getMobillBnakAccounts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let { bankAccounts, mobileBankAccounts } = params;

  console.log("HowTopUpWallet params, ", params);

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
                    <RechargeItems keyName="ont" bankAccounts={bankAccounts} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="mobileBank">
                    <RechargeItems keyName="mbt" bankAccounts={mobileBankAccounts} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="cash">
                    <RechargeItems keyName="ct" bankAccounts={bankAccounts} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="cheque">
                    <RechargeItems keyName="cqt" bankAccounts={bankAccounts} />
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

HowTopUpWallet.prototypes = {
  getMobillBnakAccounts: PropTypes.func.isRequired,
  getBnakAccounts: PropTypes.func.isRequired,
  bankAccounts: PropTypes.object.isRequired,
  mobileBankAccounts: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  console.log("Redux State Banks Accounts ", state.recharge);
  return {
    bankAccounts: state.recharge.bankAccounts,
    mobileBankAccounts: state.recharge.mobileBanks,
    errors: state.recharge.errors,
  };
};
export default connect(mapStateToProps, {
  getMobillBnakAccounts,
  getBnakAccounts,
})(HowTopUpWallet);
