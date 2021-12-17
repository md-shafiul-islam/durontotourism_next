/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import Select from "react-select";
import { Button, Col, Row } from "react-bootstrap";
import { PropTypes } from "prop-types";
import {
  getBankAccountsByName,
  getBankAccountsNames,
  getBankAccountsByAcNo,
  getAllBankOptions,
  getBankAccountsByBankName,
  getBankAccountsByBankNameAndBranchName,
} from "../../redux/actions/rechargeAction";
import { connect } from "react-redux";
import Thumb from "../layout/Thumb";
import CstSingleDatePicker from "../Fields/CstSingleDatePicker";
import { helperIsEmpty } from "../../utils/helper/helperAction";
import { useSession } from "next-auth/react";
import CstSelectCountry from "../Fields/CstSelectCountry";
import { getCountryOptions } from "../../redux/actions/countriyAction";
import CstSelectValidateField from "../Fields/CstSelectValidateField";
import CstUploadFileFieldValidet from "../Fields/CstUploadFileFieldValidet";

const AddReachage = (params) => {
  let { title, isError, submitAction, validationScema, bankAccount } = params;
  const [selectedAccount, setSelectedAccount] = useState({});
  const [attachFile, setAttachFile] = useState(undefined);
  const [tokenStatus, setTokenSttaus] = useState(false);
  // console.log("OnlineTransferReachage params, ", params);
  const { status, data } = useSession();

  const initBankOptions = () => {
    console.log("Run Bank Options ", data);
    if (data) {
      setTokenSttaus(true);
    }
    if (!helperIsEmpty(params.bankOptions)) {
      if (params.bankOptions.length === 0) {
        params.getAllBankOptions();
      }
    } else {
      params.getAllBankOptions();
    }
  };

  const initCountryOptions = () => {
    if (!helperIsEmpty(params.countryOptions)) {
      if (params.countryOptions.length === 0) {
        params.getCountryOptions();
      }
    } else {
      params.getCountryOptions();
    }
  };

  useEffect(() => {
    initBankOptions();
  }, [tokenStatus]);

  useEffect(() => {
    console.log("Authentication status, ", status);
    if (status === "authenticated") {
      initBankOptions();
    }

    initCountryOptions();
  }, [status]);

  useEffect(() => {
    params.getBankAccountsNames();
  }, []);

  useEffect(() => {
    setSelectedAccount(bankAccount);
  }, [params.bankAccount]);

  const bankNameChangeAction = (bank) => {
    console.log("bankNameChangeAction, ", bank);
    if (bank !== undefined && bank !== null) {
      params.getBankAccountsByBankName(bank.label, data && data.accessToken);
    }
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

  const changeBranchAction = (branchName, bankName) => {
    console.log("Change Branch Name, ", bankName, branchName);
    const query = {
      bankname: bankName,
      branchName: branchName,
    };
    params.getBankAccountsByBankNameAndBranchName(query);
  };

  const changeAccountNameAction = (accountName, branchName, bankName) => {
    console.log("Change Account Name, ", bankName, branchName, accountName);
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
          refferenceNote: "",
          transectionDate: "",
          type: "",
          accountId: "",
        }}
        validationSchema={validationScema}
        onSubmit={(values, actions) => {
          console.log("Submiting ... ", values);
          submitAction(values);
        }}
      >
        {(props) => (
          <Form>
            <Row className="card-pay-row">
              <Col md={{ span: 6, offset: 6 }}>
                <label className="form-label" htmlFor="country">
                  Country.{" "}
                </label>
                <CstSelectCountry
                  name="country"
                  onChange={(item) => {
                    console.log("Issu Cuntry ", item);
                    let code = item ? item.value : "";
                    props.setFieldValue(`country`, code);
                  }}
                  blurHandler={() => {
                    props.setFieldTouched("country", true);
                  }}
                  options={params.countryOptions}
                  placeholder={"Select Country"}
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
                    props.setFieldValue(`bankName`, item.label);
                    bankNameChangeAction(item);
                    props.setFieldValue(`branchName`, "");
                    props.setFieldValue(`accountName`, "");
                    props.setFieldValue(`accountNumber`, "");
                  }}
                  onBlur={() => {
                    props.setFieldTouched(`bankName`, true);
                  }}
                  id={`bankName`}
                  options={params.bankOptions}
                  className={`vselect-item ${
                    isError(props.errors, props.touched, "bankName").cls
                  }`}
                />

                <div className="invalid-feedback">
                  {isError(props.errors, props.touched, "bankName").msg}
                </div>
              </Col>
              <Col md={6}>
                <label className="form-label" htmlFor="branchName">
                  Branch Name
                </label>
                <CstSelectValidateField
                  {...props}
                  name="branchName"
                  placeholder="Branch Name"
                  options={params.branchOptions}
                  onChange={(item) => {
                    console.log(
                      "Agent Branch Action ",
                      item,
                      " Bank Name ",
                      props.values.bankName
                    );
                    props.setFieldValue(`branchName`, item.label);
                    props.setFieldValue(`accountName`, "");
                    props.setFieldValue(`accountNumber`, "");
                    changeBranchAction(item.label, props.values.bankName);
                  }}
                  value={props.values.bankName}
                />
              </Col>
            </Row>
            <Row className="card-pay-row">
              <Col md={12}>
                <label className="form-label" htmlFor="accountName">
                  Account Name
                </label>
                <CstSelectValidateField
                  {...props}
                  name="accountName"
                  placeholder="Account Name"
                  options={params.accountNameOpts}
                  onChange={(item) => {
                    props.setFieldValue(`accountName`, item.value);
                    props.setFieldValue(`accountNumber`, "");
                    changeAccountNameAction(
                      item.value,
                      props.values.branchName,
                      props.values.bankName
                    );
                  }}
                  defaultValue={props.values.accountNumber}
                  value={props.values.accountName}
                />
              </Col>
            </Row>
            <Row className="card-pay-row">
              <Col md={12}>
                <label className="form-label" htmlFor="accountNumber">
                  Account Number
                </label>
                <CstSelectValidateField
                  {...props}
                  name="accountNumber"
                  placeholder="Account Number"
                  options={params.accountNoOptions}
                  onChange={(item) => {
                    props.setFieldValue(`accountNumber`, item.value);
                    props.setFieldValue(`accountId`, item.label);
                  }}
                  value={props.values.accountNumber}
                />
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

                <CstSingleDatePicker
                  name="transectionDate"
                  placeholder="Transection Date"
                  getSelectedDate={(date) => {
                    props.setFieldValue(`transectionDate`, date);
                  }}
                />

                <div className="invalid-feedback">
                  {isError(props.errors, props.touched, "transectionDate").msg}
                </div>
              </Col>
            </Row>
            <Row className="card-pay-row">
              <Col md={12}>
                <label className="form-label" htmlFor="refferenceNote">
                  Reference Note.{" "}
                </label>
                <textarea
                  placeholder="Refrence Note"
                  name="refferenceNote"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  id={`refferenceNote`}
                  className={`form-control ${
                    isError(props.errors, props.touched, "refferenceNote").cls
                  }`}
                ></textarea>
                <div className="invalid-feedback">
                  {isError(props.errors, props.touched, "refferenceNote").msg}
                </div>
              </Col>
            </Row>
            <Row className="card-pay-row">
              <Col md={6}>
                <label className="form-label" htmlFor="transectionId">
                  Transection Id.{" "}
                </label>
                <Field
                  placeholder="Transection Id Or Receipt Number?"
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
                <label className="form-label" htmlFor="slipeAttachment">
                  Screnshort of fund Transfer Successful
                </label>
                <CstUploadFileFieldValidet name="slipeAttachment" {...props} />
              </Col>
            </Row>

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
            {/* Error
            <pre>{JSON.stringify(props.errors, null, 2)}</pre> */}
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

AddReachage.prototypes = {
  getBankAccountsNames: PropTypes.func.isRequired,
  getAllBankOptions: PropTypes.func.isRequired,
  getCountryOptions: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  bankNames: PropTypes.object.isRequired,
  bankAccountOptions: PropTypes.object.isRequired,
  bankAccount: PropTypes.object.isRequired,
  bankOptions: PropTypes.object.isRequired,
  countryOptions: PropTypes.object.isRequired,
  accountNameOpts: PropTypes.object.isRequired,
  branchOptions: PropTypes.object.isRequired,
  accountNoOptions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  console.log("Transections Redux State, ", state);
  return {
    bankNames: state.recharge.bankNames,
    bankOptions: state.recharge.bankOptions,
    countryOptions: state.country.countryOptions,
    accountNameOpts: state.recharge.banksAccountNameOpt,
    branchOptions: state.recharge.banksAccountBranchOpt,
    accountNoOptions: state.recharge.banksAccountNoOpt,
  };
};

export default connect(mapStateToProps, {
  getBankAccountsNames,
  getBankAccountsByName,
  getBankAccountsByAcNo,
  getAllBankOptions,
  getCountryOptions,
  getBankAccountsByBankName,
  getBankAccountsByBankNameAndBranchName,
})(AddReachage);
