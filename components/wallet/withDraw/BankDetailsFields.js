import { Field } from "formik";
import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import Select from "react-select";
import { esIsFieldError } from "../../../utils/helper/helperAction";

const BankDetailsFields = (props) => {
  let { bankStatus } = props;
  return (
    <Card>
      <Card.Body>
        <Card.Title>Bank Details</Card.Title>

        {bankStatus && bankStatus === "mobile_bank" ? (
          <Row className="withdraw-row">
            <Col md={6}>
              <label className="form-label">Mobile Bank Name:</label>
              <Select
                placeholder="Select Bank Name"
                id="mobileBankName"
                name="mobileBankName"
                onChange={(value) => {
                  props.setFieldValue(`mobileBankName`, value);
                }}
                onBlur={props.handleBlur}
                className={`vselect-item ${
                  esIsFieldError(props.errors, props.touched, "mobileBankName")
                    .cls
                }`}
              />

              <div className="invalid-feedback">
                {
                  esIsFieldError(props.errors, props.touched, "mobileBankName")
                    .msg
                }
              </div>
            </Col>

            <Col md={6}>
              <label className="form-label">Mobile No./Account No.</label>
              <Field
                name="phoneNo"
                id="phoneNo"
                placeholder="Phone No/Mobile Bank Account No."
                className={`form-control ${
                  esIsFieldError(props.errors, props.touched, "phoneNo").cls
                }`}
              />

              <div className="invalid-feedback">
                {esIsFieldError(props.errors, props.touched, "phoneNo").msg}
              </div>
            </Col>
          </Row>
        ) : (
          <React.Fragment>
            <Row className="withdraw-row">
              <Col md={6}>
                <label className="form-label">Bank Name:</label>
                <Select
                  placeholder="Select Bank Name"
                  id="bankName"
                  name="bankName"
                  onChange={(value) => {
                    props.setFieldValue(`bankName`, value);
                  }}
                  onBlur={props.handleBlur}
                  className={`vselect-item ${
                    esIsFieldError(props.errors, props.touched, "bankName").cls
                  }`}
                />

                <div className="invalid-feedback">
                  {esIsFieldError(props.errors, props.touched, "bankName").msg}
                </div>
              </Col>

              <Col md={6}>
                <label className="form-label">Bank Account Name.</label>
                <Field
                  name="accountName"
                  id="accountName"
                  placeholder="Bank Account Name"
                  className={`form-control ${
                    esIsFieldError(props.errors, props.touched, "accountName")
                      .cls
                  }`}
                />

                <div className="invalid-feedback">
                  {
                    esIsFieldError(props.errors, props.touched, "accountName")
                      .msg
                  }
                </div>
              </Col>
            </Row>
            <Row className="withdraw-row">
              <Col md={6}>
                <label className="form-label">Branch Name</label>
                <Field
                  name="branchName"
                  placeholder="Branch Name"
                  id="branchName"
                  className={`form-control ${
                    esIsFieldError(props.errors, props.touched, "branchName")
                      .cls
                  }`}
                />

                <div className="invalid-feedback">
                  {
                    esIsFieldError(props.errors, props.touched, "branchName")
                      .msg
                  }
                </div>
              </Col>

              <Col md={6}>
                <label className="form-label">Bank Account No.</label>
                <Field
                  name="bankAccountNumber"
                  id="bankAccountNumber"
                  placeholder="Bank Ac/No"
                  className={`form-control ${
                    esIsFieldError(
                      props.errors,
                      props.touched,
                      "bankAccountNumber"
                    ).cls
                  }`}
                />

                <div className="invalid-feedback">
                  {
                    esIsFieldError(
                      props.errors,
                      props.touched,
                      "bankAccountNumber"
                    ).msg
                  }
                </div>
              </Col>
            </Row>
          </React.Fragment>
        )}
      </Card.Body>
    </Card>
  );
};

export default BankDetailsFields;
