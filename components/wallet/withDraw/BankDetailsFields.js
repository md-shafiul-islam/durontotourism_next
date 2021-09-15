import { Field } from "formik";
import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import Select from "react-select";

const BankDetailsFields = ({ handleBlur, setFieldValue }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Bank Details</Card.Title>
        <Row className="withdraw-row">
          <Col md={6}>
            <label className="form-label">Bank Name:</label>
            <Select
              placeholder="Select Bank Name"
              id="bankName"
              name="bankName"
              onChange={(value) => {
                setFieldValue(`bankName`, value);
              }}
              onBlur={handleBlur}
            />
          </Col>

          <Col md={6}>
            <label className="form-label">Bank Account Name.</label>
            <Field
              name="accountName"
              id="accountName"
              className="form-control"
              placeholder="Bank Account Name"
            />
          </Col>
        </Row>
        <Row className="withdraw-row">
          <Col md={6}>
            <label className="form-label">Branch Name</label>
            <Field
              name="branchName"
              placeholder="Branch Name"
              id="branchName"
              className="form-control"
            />
          </Col>

          <Col md={6}>
            <label className="form-label">Bank Account No.</label>
            <Field
              name="bankAccountNumber"
              id="bankAccountNumber"
              placeholder="Bank Ac/No"
              className="form-control"
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default BankDetailsFields;
