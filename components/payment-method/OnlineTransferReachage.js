import React from "react";
import { Field, Form, Formik } from "formik";
import Select from "react-select";
import { Button, Col, Row } from "react-bootstrap";
import { getNmsOptions } from "../../utils/helper/esFnc";

const OnlineTransferReachage = ({ title, isError, submitAction, validationScema }) => {
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
        }}
        validationSchema={validationScema}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            submitAction(values);
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {(props) => (
          <Form>
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
                  }}
                  onBlur={() => {
                    props.setFieldTouched(`bankName`, true);
                  }}
                  id={`bankName`}
                  options={getNmsOptions(10, 0, 2)}
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
                <Select
                  placeholder="Branch Name"
                  name={`branchName`}
                  onChange={(item) => {
                    props.setFieldValue(`branchName`, item ? item.value : "");
                  }}
                  onBlur={() => {
                    props.setFieldTouched(`branchName`, true);
                  }}
                  id={`branchName`}
                  options={getNmsOptions(10, 0, 2)}
                  className={`vselect-item ${
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
                <Select
                  placeholder="Account Name"
                  name={`accountName`}
                  onChange={(item) => {
                    props.setFieldValue(`accountName`, item ? item.value : "");
                  }}
                  onBlur={() => {
                    props.setFieldTouched(`accountName`, true);
                  }}
                  id={`accountName`}
                  options={getNmsOptions(10, 0, 2)}
                  className={`vselect-item ${
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
                  }}
                  onBlur={() => {
                    props.setFieldTouched(`accountNumber`, true);
                  }}
                  id={`accountNumber`}
                  options={getNmsOptions(10, 0, 2)}
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
                <label className="form-label" htmlFor="country">
                  Country.{" "}
                </label>
                <Select
                  placeholder="Country"
                  name={`country`}
                  onChange={(item) => {
                    props.setFieldValue(`country`, item ? item.value : "");
                  }}
                  onBlur={() => {
                    props.setFieldTouched(`country`, true);
                  }}
                  id={`country`}
                  options={getNmsOptions(10, 0, 2)}
                  className={`vselect-item ${
                    isError(props.errors, props.touched, "country").cls
                  }`}
                />
                <div className="invalid-feedback">
                  {isError(props.errors, props.touched, "country").msg}
                </div>
              </Col>
            </Row>

            <Row className="card-pay-row">
              <Col md={12}>
                <label className="form-label" htmlFor="amount">
                  Reference Note.{" "}
                </label>
                <textarea
                  placeholder="Amount"
                  name="referenceNumber"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  id={`referenceNumber`}
                  className={`form-control ${
                    isError(props.errors, props.touched, "amount").cls
                  }`}
                ></textarea>
                <div className="invalid-feedback">
                  {isError(props.errors, props.touched, "amount").msg}
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
                <label className="form-label" htmlFor="slipeAttachment">
                  Screnshort of fund Transfer Successful
                </label>
                <Field
                  className={`form-control ${
                    isError(props.errors, props.touched, "slipeAttachment").cls
                  }`}
                  type="file"
                  name="slipeAttachment"
                  id="slipeAttachment"
                />
                <div className="invalid-feedback">
                  {isError(props.errors, props.touched, "slipeAttachment").msg}
                </div>
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
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default OnlineTransferReachage;
