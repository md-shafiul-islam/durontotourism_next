import React, { useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import Select from "react-select";
import { Button, Col, Row } from "react-bootstrap";
import { PropTypes } from "prop-types";
import {
  getBankAccountsByName,
  getBankAccountsNames,
  getBankAccountsByAcNo,
} from "../../redux/actions/rechargeAction";
import { connect } from "react-redux";
import Thumb from "../layout/Thumb";

const OnlineTransferReachage = (params) => {
  let { title, isError, submitAction, validationScema, bankAccount } = params;
  const [selectedAccount, setSelectedAccount] = useState({});
  const [attachFile, setAttachFile] = useState(undefined);
  console.log("OnlineTransferReachage params, ", params);

  useEffect(() => {
    params.getBankAccountsNames();
  }, []);

  useEffect(() => {
    setSelectedAccount(bankAccount);
  }, [params.bankAccount]);

  const bankNameChangeAction = (bankName) => {
    console.log("bankNameChangeAction, ", bankName);
    params.getBankAccountsByName(bankName);
  };

  const bankAccountNoChangeAction = (acNo) => {
    params.getBankAccountsByAcNo(acNo);
  };

  const uploadImage = (image) => {
    console.log("OnlineTransferReachage Image, ", image);
  };

  const changeImageAction = (e) => {
    if (e.currentTarget.files !== undefined) {
      setAttachFile(e.currentTarget.files[0]);
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Col md={12}>
          <h4>{title ? title : "Recharge Wallet"}</h4>
        </Col>
      </Row>
      <Formik
        initialValues={{
          accountName: "",
          accountNumber: "",
          bankName: "",
          branchName: "",
          amount: "",
          country: "",
          slipeAttachment: "",
          transectionId: "",
          referenceNumber: "",
          transectionDate:""
        }}
        validationSchema={validationScema}
        onSubmit={(values, actions) => {
          console.log("Selected Account ", selectedAccount);
          submitAction(values, selectedAccount.id);
          
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Row className="card-pay-row">
              <Col md={{span:6, offset:6}}>
                <label className="form-label" htmlFor="country">
                  Country.{" "}
                </label>
                <Field
                  type="text"
                  name={`country`}
                  readOnly
                  value={
                    selectedAccount
                      ? selectedAccount.country && selectedAccount.country.name
                      : ""
                  }
                  id={`country`}
                  className={`form-control ${
                    isError(props.errors, props.touched, "country").cls
                  }`}
                />
                <div className="invalid-feedback">
                  {isError(props.errors, props.touched, "country").msg}
                </div>
              </Col>
            </Row>
            <Row className="card-pay-row">
              <Col md={6}>
                <label className="form-label" htmlFor="bankName">
                  Bank Name
                </label>
                <Select
                  placeholder="Bank Name"
                  name={`bankName`}
                  onChange={(item) => {
                    props.setFieldValue(`bankName`, item ? item.value : "");
                    bankNameChangeAction(item.value);
                  }}
                  onBlur={() => {
                    props.setFieldTouched(`bankName`, true);
                  }}
                  id={`bankName`}
                  options={params.bankNames}
                  className={`vselect-item ${
                    isError(props.errors, props.touched, "bankName").cls
                  }`}
                />
                {console.log(
                  "Current Error, BankName ",
                  isError(props.errors, props.touched, "bankName")
                )}
                <div className="invalid-feedback">
                  {isError(props.errors, props.touched, "bankName").msg}
                </div>
              </Col>
              <Col md={6}>
                <label className="form-label" htmlFor="branchName">
                  Branch Name
                </label>
                <Field
                  type="text"
                  name={`branchName`}
                  readOnly
                  value={
                    selectedAccount ? selectedAccount.branchName : "Not Set yet"
                  }
                  id={`branchName`}
                  className={`form-control ${
                    isError(props.errors, props.touched, "branchName").cls
                  }`}
                />

                <div className="invalid-feedback">
                  {isError(props.errors, props.touched, "branchName").msg}
                </div>
              </Col>
            </Row>

            <Row className="card-pay-row">
              <Col md={12}>
                <label className="form-label" htmlFor="accountName">
                  Account Name
                </label>
                <Field
                  type="text"
                  name={`accountName`}
                  readOnly
                  value={
                    selectedAccount
                      ? selectedAccount.accountName
                      : "Not yet set"
                  }
                  id={`accountName`}
                  className={`form-control ${
                    isError(props.errors, props.touched, "accountName").cls
                  }`}
                />
                <div className="invalid-feedback">
                  {isError(props.errors, props.touched, "accountName").msg}
                </div>
              </Col>
            </Row>

            <Row className="card-pay-row">
              <Col md={12}>
                <label className="form-label" htmlFor="accountNumber">
                  Account Number
                </label>
                <Select
                  placeholder="Account Number"
                  name={`accountNumber`}
                  onChange={(item) => {
                    props.setFieldValue(
                      `accountNumber`,
                      item ? item.value : ""
                    );
                    bankAccountNoChangeAction(item.value);
                  }}
                  onBlur={() => {
                    props.setFieldTouched(`accountNumber`, true);
                  }}
                  id={`accountNumber`}
                  options={
                    params.bankOptions && params.bankOptions.bankAccountNo
                  }
                  className={`vselect-item ${
                    isError(props.errors, props.touched, "accountNumber").cls
                  }`}
                />
                
                <div className="invalid-feedback">
                  {isError(props.errors, props.touched, "accountNumber").msg}
                </div>
              </Col>
            </Row>

            <Row className="card-pay-row">
              <Col md={6}>
                <label className="form-label" htmlFor="amount">
                  Amount.{" "}
                </label>
                <Field
                  placeholder="Amount"
                  name={`amount`}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  id={`amount`}
                  className={`form-control ${
                    isError(props.errors, props.touched, "amount").cls
                  }`}
                />
                <div className="invalid-feedback">
                  {isError(props.errors, props.touched, "amount").msg}
                </div>
              </Col>
              <Col md={6}>
                <label className="form-label" htmlFor="transectionDate">
                  Transection Date{" "}
                </label>
                <Field
                  type="date"
                  placeholder="Transection Id if have?"
                  name={`transectionDate`}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  id={`transectionDate`}
                  className={`form-control ${
                    isError(props.errors, props.touched, "transectionDate").cls
                  }`}
                />

                <div className="invalid-feedback">
                  {isError(props.errors, props.touched, "transectionDate").msg}
                </div>
              </Col>
            </Row>

            <Row className="card-pay-row">
              <Col md={12}>
                <label className="form-label" htmlFor="referenceNumber">
                  Reference Note.{" "}
                </label>
                <textarea
                  placeholder="Refrence Note"
                  name="referenceNumber"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  id={`referenceNumber`}
                  className={`form-control ${
                    isError(props.errors, props.touched, "referenceNumber").cls
                  }`}
                ></textarea>
                <div className="invalid-feedback">
                  {isError(props.errors, props.touched, "referenceNumber").msg}
                </div>
              </Col>
            </Row>
            <Row className="card-pay-row">
              <Col md={6}>
                <label className="form-label" htmlFor="transectionId">
                  Transection Id.{" "}
                </label>
                <Field
                  placeholder="Transection Id if have?"
                  name={`transectionId`}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  id={`transectionId`}
                  className={`form-control ${
                    isError(props.errors, props.touched, "transectionId").cls
                  }`}
                />

                <div className="invalid-feedback">
                  {isError(props.errors, props.touched, "transectionId").msg}
                </div>
              </Col>
              <Col md={6}>
                <Row className="card-pay-row">
                  <Col md={8}>
                    <label className="form-label" htmlFor="slipeAttachment">
                      Screnshort of fund Transfer Successful
                    </label>
                    <input
                      className={`form-control ${
                        isError(props.errors, props.touched, "slipeAttachment")
                          .cls
                      }`}
                      type="file"
                      name="slipeAttachment"
                      id="slipeAttachment"
                      onChange={(e) => {
                        changeImageAction(e);
                        props.setFieldValue(
                          `slipeAttachment`,
                          e.currentTarget.files[0]
                        );
                      }}
                    />
                    <div className="invalid-feedback">
                      {
                        isError(props.errors, props.touched, "slipeAttachment")
                          .msg
                      }
                    </div>
                  </Col>
                  <Col md={4}>
                    <Thumb file={attachFile} />
                  </Col>
                </Row>
              </Col>
            </Row>

            {props.errors.accountNumber && (
              <div id="feedback">{props.errors.accountNumber}</div>
            )}
            <Row className="card-pay-row">
              <Col md={8}>
                <p className="pay-text"></p>
              </Col>
              <Col md={4}>
                <Button type="submit" className="payment-btn">
                  Recharge Now
                </Button>
              </Col>
            </Row>
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
};

OnlineTransferReachage.prototypes = {
  getBankAccountsNames: PropTypes.func.isRequired,
  getBankAccountsByName: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  bankNames: PropTypes.object.isRequired,
  bankOptions: PropTypes.object.isRequired,
  bankAccount: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  console.log("Transections Redux State, ", state);
  return {
    bankNames: state.recharge.bankNames,
    bankOptions: state.recharge.bankAccountsOptions,
    bankAccount: state.recharge.bankAccount,
  };
};

export default connect(mapStateToProps, {
  getBankAccountsNames,
  getBankAccountsByName,
  getBankAccountsByAcNo,
})(OnlineTransferReachage);
