import { Field, Form, Formik } from "formik";
import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Select from "react-select";
import BankDetailsFields from "./BankDetailsFields";
import ShippingAddressFields from "./ShippingAddressFields";

const WithDrawRequest = (params) => {
  return (
    <Row>
      <Col md={12} className="withdraw-container">
        <Formik
          initialValues={{
            withdrawType: "",
            chequeName: "",
            amount: "",
            receiveOption: "",
            address: "",
            village: "",
            zipCode: "",
            bankName: "",
            accountName: "",
            branchName: "",
            bankAccountNumber: "",
          }}
        >
          {(props) => {
            return (
              <Form>
                <Row className="withdraw-row">
                  <Col md={6}>
                    <Select
                      aria-label="Select Withdraw Type"
                      name="withdrawType"
                      placeholder="Withdraw Type"
                    />
                  </Col>
                </Row>
                <Card>
                  <Card.Body>
                    <Row className="withdraw-row">
                      <Col md={6}>
                        <label className="form-label">Cheque Name:</label>
                        <Field
                          name="chequeName"
                          placeholder="Cheque Name"
                          id="chequeName"
                          className="form-control"
                        />
                      </Col>

                      <Col md={6}>
                        <label className="form-label">Amount:</label>
                        <Field
                          name="amount"
                          placeholder="Amount"
                          id="amount"
                          className="form-control"
                        />
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
                <Row className="withdraw-row">
                  <Col md={6}>
                    <Select
                      aria-label="Select Receive Option"
                      placeholder="Receive Option"
                      name="receiveOption"
                    />
                  </Col>
                </Row>
                <ShippingAddressFields />
                <BankDetailsFields />
                <Row className="withdraw-row">
                  <Col md={6}>
                    <Button type="submit">Save</Button>
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </Col>
    </Row>
  );
};

export default WithDrawRequest;
