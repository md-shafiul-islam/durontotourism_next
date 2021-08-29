import React, { Component } from "react";
import { Field, Form, Formik } from "formik";
import { Button, Col, Nav, Row, Tab } from "react-bootstrap";
import Select from "react-select";
import { getNmsOptions } from "../../utils/helper/esFnc";
import CashReachage from "./CashReachage";
import ChequeReachage from "./ChequeReachage";
import OnlineTransferReachage from "./OnlineTransferReachage";
import * as Yup from "yup";
import MobileBankReachage from "./MobileBankReachage";
import { helperIsEmpty } from "../../utils/helper/helperAction";
import EmptyCont from "../../utils/helper/emptyCont";

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
      accountName: Yup.string().required(
        "Required. Please, Select any bank name from option list."
      ),
      accountNumber: Yup.string().required(
        "Required. Please, Select any bank name from option list"
      ),
      bankName: Yup.string().required(
        "Required. Please, Select any bank name from option list"
      ),
      branchName: Yup.string().required(
        "Required. Please, Select any bank name from option list"
      ),
      amount: Yup.string().required("Required, Please input amount"),
      slipeAttachment: Yup.string().required(
        "Required. Please, Add an image size: 350KB"
      ),
      referenceNumber: Yup.string().required(
        "Required. Please input reffernce note."
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
      console.log("Recharge Amount, ", values && values.amount);
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
                  </Nav>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <Tab.Content>
                    <Tab.Pane eventKey="onlineTransfer">
                      <OnlineTransferReachage
                        rechargeType={rechargeType}
                        submitAction={this.rechargeAction}
                        isError={this.isError}
                        validationScema={this.validationScema}
                        title="Recharge via Online Bank"
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="mobileBank">
                      <MobileBankReachage
                        rechargeType={rechargeType}
                        submitAction={this.rechargeAction}
                        isError={this.isError}
                        validationScema={this.validationScema}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="cash">
                      <CashReachage
                        rechargeType={rechargeType}
                        submitAction={this.rechargeAction}
                        validationScema={this.validationScema}
                        isError={this.isError}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="cheque">
                      <ChequeReachage
                        rechargeType={rechargeType}
                        submitAction={this.rechargeAction}
                        isError={this.isError}
                        validationScema={this.validationScema}
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

export default RechargeWallet;
