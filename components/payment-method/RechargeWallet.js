import React, { Component } from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import OnlineTransferReachage from "./OnlineTransferReachage";
import * as Yup from "yup";
import { helperIsEmpty } from "../../utils/helper/helperAction";
import { addRechargeAction } from "../../redux/actions/rechargeAction";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import LoaderSpiner from "../../utils/helper/loaderSpiner";

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

  validationScema = () => {
    return Yup.object().shape({
      accountName: Yup.string().max(1),
      accountNumber: Yup.string().required(
        "Required. Please, Select any bank name from option list"
      ),
      bankName: Yup.string().required(
        "Required. Please, Select any bank name from option list"
      ),
      branchName: Yup.string().max(1),
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
                      <Nav.Link eventKey="mobileBank">
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
                      <OnlineTransferReachage
                        rechargeType={rechargeType}
                        submitAction={(values, accountId) => {
                          this.rechargeAction({
                            type: "online_bank",
                            values,
                            accountId,
                          });
                        }}
                        isError={this.isError}
                        validationScema={this.validationScema}
                        title="Recharge via Online Bank"
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="mobileBank">
                      <OnlineTransferReachage
                        rechargeType={rechargeType}
                        submitAction={(values, accountId) => {
                          this.rechargeAction({
                            type: "mobile_bank",
                            values,
                            accountId,
                          });
                        }}
                        isError={this.isError}
                        validationScema={this.validationScema}
                        title="Recharge via Mobile Bank"
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="cash">
                      <OnlineTransferReachage
                        rechargeType={rechargeType}
                        submitAction={(values, accountId) => {
                          this.rechargeAction({
                            type: "cash",
                            values,
                            accountId,
                          });
                        }}
                        isError={this.isError}
                        validationScema={this.validationScema}
                        title="Recharge via Bank deposit or cash"
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="cheque">
                      <OnlineTransferReachage
                        rechargeType={rechargeType}
                        submitAction={(values, accountId) => {
                          this.rechargeAction({
                            type: "cheque",
                            values,
                            accountId,
                          });
                        }}
                        isError={this.isError}
                        validationScema={this.validationScema}
                        title="Recharge via Bank cheque deposit"
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
  }
}

RechargeWallet.prototypes = {
  addRechargeAction: PropTypes.func.isRequired,
  rechargeStatus: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    rechargeStatus: state.recharge.rechargeStatus,
  };
};

export default connect(mapStateToProps, { addRechargeAction })(RechargeWallet);
