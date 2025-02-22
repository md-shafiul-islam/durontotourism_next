import React, { Component } from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import AddReachage from "./AddReachage";
import * as Yup from "yup";
import { helperIsEmpty } from "../../utils/helper/helperAction";
import { addRechargeAction } from "../../redux/actions/rechargeAction";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getWalletRechargeRequest } from "../../redux/actions/rechargeAction";
import LoaderSpiner from "../../utils/helper/loaderSpiner";
import RechargeRequestList from "./RechargeRequestList";

const rechargeTypes = [
  { label: "Cash", value: "cash" },
  { label: "Cheque", value: "cheque" },
  { label: "Online Transfer", value: "online_transfer" },
  { label: "Mobile Bank", value: "mobile_bank" },
];

class RechargeWallet extends Component {
  state = {
    cash: {
      accountName: "",
      accountNumber: "",
      bankName: "",
      branchName: "",
      amount: "",
      country: "",
      slipeAttachment: "",
      transectionId: "",
    },
    cheque: {
      accountName: "",
      accountNumber: "",
      bankName: "",
      branchName: "",
      amount: "",
      country: "",
      chequeNumber: "",
      slipeAttachment: "",
      transectionId: "",
    },
    onlineTransfer: {
      accountName: "",
      accountNumber: "",
      bankName: "",
      branchName: "",
      amount: "",
      country: "",
      slipeAttachment: "",
      referenceNumber: "",
      transectionId: "",
    },
    mobileBank: {
      accountName: "",
      accountNumber: "",
      bankName: "",
      branchName: "",
      amount: "",
      country: "",
      slipeAttachment: "",
      referenceNumber: "",
      transectionId: "",
    },
    rechargeType: "cash",
  };

  componentDidMount() {
    this.props.getWalletRechargeRequest();
  }

  validationScema = () => {
    return Yup.object().shape({
      accountName: Yup.string().min(1),
      accountNumber: Yup.string().required(
        "Required. Please, Select any bank name from option list"
      ),
      bankName: Yup.string().required(
        "Required. Please, Select any bank name from option list"
      ),
      branchName: Yup.string().min(1),
      amount: Yup.number()
        .required("Required, Please input amount")
        .typeError("Input Type must be number"),
      slipeAttachment: Yup.mixed(),
      referenceNumber: Yup.string().min(0),
      transectionDate: Yup.date().required(
        "Select Bank Or Mobile Transection Date"
      ),
    });
  };

  isError = (errors, touched, fieldName) => {
    let msg = undefined;
    if (
      !helperIsEmpty(errors) &&
      !helperIsEmpty(touched) &&
      !helperIsEmpty(fieldName)
    ) {
      if (
        !helperIsEmpty(errors[fieldName]) &&
        !helperIsEmpty(touched[fieldName])
      ) {
        msg = errors[fieldName];
      }
    }

    if (touched[fieldName]) {
      if (msg) {
        return { cls: "is-invalid", msg: msg, status: true };
      } else {
        return { cls: "is-valid", msg: "", status: false };
      }
    }
    return { cls: "", msg: msg, status: false };
  };

  rechargeAction = (values) => {
    if (values) {
      this.props.addRechargeAction(values);
    }
  };

  typeSelectAction = (item) => {
    console.log("Selected Item, ", item);
    if (item) {
      this.setState({ rechargeType: item.value });
    }
  };

  render() {
    let { rechargeType } = this.state;

    return (
      <React.Fragment>
        {this.props.rechargeStatus ? (
          <LoaderSpiner show={true} loadingText="Recharge adding..." />
        ) : (
          <LoaderSpiner show={false} />
        )}
        <Row>
          <Col md={12} className="recharg-option-nav">
            <Tab.Container
              id="rechargeOptions"
              defaultActiveKey="onlineTransfer"
            >
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

                    <Nav.Item>
                      <Nav.Link eventKey="requestTopUpList">
                        TopUp my wallet request list
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <Tab.Content>
                    <Tab.Pane eventKey="onlineTransfer">
                      <AddReachage
                        rechargeType={rechargeType}
                        submitAction={(values, accountId) => {
                          values.type = "online_bank";
                          this.rechargeAction(values);
                        }}
                        isError={this.isError}
                        validationScema={this.validationScema}
                        title="Recharge via Online Bank"
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="mobileBank">
                      <AddReachage
                        rechargeType={rechargeType}
                        submitAction={(values, accountId) => {
                          values.type = "mobile_bank";
                          this.rechargeAction(values);
                        }}
                        isError={this.isError}
                        validationScema={this.validationScema}
                        title="Recharge via Mobile Bank"
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="cash">
                      <AddReachage
                        rechargeType={rechargeType}
                        submitAction={(values, accountId) => {
                          values.type = "cash";
                          this.rechargeAction(values);
                        }}
                        isError={this.isError}
                        validationScema={this.validationScema}
                        title="Recharge via Bank deposit or cash"
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="cheque">
                      <AddReachage
                        rechargeType={rechargeType}
                        submitAction={(values, accountId) => {
                          values.type = "cheque";
                          this.rechargeAction(values);
                        }}
                        isError={this.isError}
                        validationScema={this.validationScema}
                        title="Recharge via Bank cheque deposit"
                        chequeStatus={true}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="requestTopUpList">
                      <RechargeRequestList recharges={this.props.recharges} />
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

RechargeWallet.prototypes = {
  addRechargeAction: PropTypes.func.isRequired,
  getWalletRechargeRequest: PropTypes.func.isRequired,
  rechargeStatus: PropTypes.object.isRequired,
  bankOptions: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  recharges: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    rechargeStatus: state.recharge.rechargeStatus,
    recharges: state.recharge.recharges,
  };
};

export default connect(mapStateToProps, {
  addRechargeAction,
  getWalletRechargeRequest,
})(RechargeWallet);
