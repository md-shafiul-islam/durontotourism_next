import React, { useState } from "react";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";

import { Button, Card, Col, Row } from "react-bootstrap";
import Select from "react-select";
import BankDetailsFields from "./BankDetailsFields";
import ShippingAddressFields from "./ShippingAddressFields";
import {
  esIsFieldError,
  helperIsEmpty,
} from "../../../utils/helper/helperAction";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getAddWithDarawAction } from "../../../redux/actions/withDarawAction";

const withDrawTypes = [
  { value: "cheque", label: "Cheque" },
  { value: "mobile_bank", label: "Mobile Banking" },
  { value: "online_trans", label: "Online Banking/Transfer" },
];

const receiveOptions = [
  { value: "post_mail", label: "Courier/Post Office" },
  { value: "myself", label: "By Hand/Myself" },
  { value: "deposit_to_bank", label: "Deposit to Bnak Accoount" },
];

const WithDrawRequest = (params) => {
  const [withDrawType, setWithDrawType] = useState({});
  const [receiveOption, setReceiveOption] = useState({});
  // const [bankStatus, setBankStatus] = useState(undefined);

  const validationSchema = () => {
    return Yup.object().shape({
      withdrawType: Yup.string().required(
        "Required, Please Select one Withdrawal Method/Type"
      ),
      chequeName: Yup.string().when("withdrawType", {
        is: "cheque",
        then: Yup.string().required(
          "Please, Enter Cheque owner/rceveiver name."
        ),
      }),
      amount: Yup.number()
        .required("Required, Please input amount")
        .typeError("Input Type must be number"),

      receiveOption: Yup.string().when("withdrawType", {
        is: "cheque",
        then: Yup.string().required("Please, Select one Receive option"),
      }),

      policeStation: Yup.string().when("receiveOption", {
        is: "post_mail",
        then: Yup.string().required(
          "Please, Enter your shipping Police Station"
        ),
      }),
      village: Yup.string().when("receiveOption", {
        is: "post_mail",
        then: Yup.string().required(
          "Please, Enter your shipping Village/House No.:"
        ),
      }),

      roadNo: Yup.string().when("receiveOption", {
        is: "post_mail",
        then: Yup.string().required(
          "Please, Enter your shipping Road No. /Road Name.:"
        ),
      }),

      zipCode: Yup.string().when("receiveOption", {
        is: "post_mail",
        then: Yup.string().required("Please, Enter your Zipcode"),
      }),
      district: Yup.string().when("receiveOption", {
        is: "post_mail",
        then: Yup.string().required("Please, Enter your District name"),
      }),
      bankName: Yup.string().max(1),

      accountName: Yup.string().when("withdrawType", (v) => {
        if (v === "cheque" || v === "online_trans") {
          return Yup.string().required(
            "Required. Please, Enter Bank Account Name."
          );
        }
      }),
      branchName: Yup.string().when("withdrawType", (value) => {
        // console.log("Branch Name Scema Value: ", value);
        if (value === "cheque" || value === "online_trans") {
          return Yup.string().required("Required. Please, Enter Brance name ");
        }
      }),

      bankAccountNumber: Yup.string().when("withdrawType", (v) => {
        if (v === "cheque" || v === "online_trans") {
          return Yup.string().required(
            "Required. Please, Enter Bank Account Number."
          );
        }
      }),

      phoneNo: Yup.string().when("withdrawType", {
        is: "mobile_bank",
        then: Yup.string().required(
          "Required. Please, Enter Mobile Banking Account Number."
        ),
      }),

      mobileBankName: Yup.string().when("withdrawType", {
        is: "mobile_bank",
        then: Yup.string().required(
          "Required. Please, Enter Mobile Banking Provider Name eg. BKash, Rocket, Nagad"
        ),
      }),
    });
  };

  const withdrawAction = (values) => {
    console.log("Add WithDraw Action :) ", values);

    // params.getAddWithDarawAction(values);
  };

  return (
    <Row>
      <Col md={12} className="withdraw-container">
        <Formik
          initialValues={{
            withdrawType: "",
            chequeName: "",
            amount: "",
            receiveOption: "",
            policeStation: "",
            roadNo: "",
            village: "",
            district: "",
            zipCode: "",
            bankName: "",
            accountName: "",
            branchName: "",
            bankAccountNumber: "",
            phoneNo: "",
            mobileBankName: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, action) => {
            withdrawAction(values);
            action.setSubmitting(false);
          }}
        >
          {(props) => {
            return (
              <Form>
                <Row className="withdraw-row">
                  <Col md={6}>
                    <label className="form-label">Withdrawal Type</label>
                    <Select
                      aria-label="Select Withdraw Type"
                      name="withdrawType"
                      placeholder="Withdraw Type"
                      options={withDrawTypes}
                      onBlur={props.handleBlur}
                      onChange={(item) => {
                        props.setFieldValue(`withdrawType`, item.value);
                        props.setFieldValue(`receiveOption`, "");
                        setWithDrawType(item.value);
                        setReceiveOption(null);
                      }}
                      className={`vselect-item ${
                        esIsFieldError(
                          props.errors,
                          props.touched,
                          "withdrawType"
                        ).cls
                      }`}
                    />

                    <div className="invalid-feedback">
                      {
                        esIsFieldError(
                          props.errors,
                          props.touched,
                          "withdrawType"
                        ).msg
                      }
                    </div>
                  </Col>
                </Row>
                <Card>
                  {!helperIsEmpty(withDrawType) ? (
                    <Card.Body>
                      <Row className="withdraw-row">
                        <Col md={6}>
                          <label className="form-label">Amount:</label>
                          <Field
                            name="amount"
                            placeholder="Amount"
                            id="amount"
                            className={`form-control ${
                              esIsFieldError(
                                props.errors,
                                props.touched,
                                "amount"
                              ).cls
                            }`}
                          />

                          <div className="invalid-feedback">
                            {
                              esIsFieldError(
                                props.errors,
                                props.touched,
                                "amount"
                              ).msg
                            }
                          </div>
                        </Col>

                        {withDrawType === "cheque" ? (
                          <Col md={6}>
                            <label className="form-label">Cheque Name:</label>
                            <Field
                              name="chequeName"
                              placeholder="Cheque Name"
                              id="chequeName"
                              className={`form-control ${
                                esIsFieldError(
                                  props.errors,
                                  props.touched,
                                  "chequeName"
                                ).cls
                              }`}
                            />

                            <div className="invalid-feedback">
                              {
                                esIsFieldError(
                                  props.errors,
                                  props.touched,
                                  "chequeName"
                                ).msg
                              }
                            </div>
                          </Col>
                        ) : (
                          ""
                        )}
                      </Row>
                    </Card.Body>
                  ) : (
                    ""
                  )}
                </Card>
                {withDrawType === "cheque" ? (
                  <Row className="withdraw-row">
                    <label className="form-label">Received By:</label>
                    <Col md={6}>
                      <Select
                        aria-label="Select Receive Option"
                        placeholder="Receive Option"
                        name="receiveOption"
                        options={receiveOptions}
                        onBlur={props.handleBlur}
                        onChange={(item) => {
                          props.setFieldValue(`receiveOption`, item.value);
                          setReceiveOption(item);
                        }}
                        defaultValue={receiveOption}
                        className={`vselect-item ${
                          esIsFieldError(
                            props.errors,
                            props.touched,
                            "receiveOption"
                          ).cls
                        }`}
                      />

                      <div className="invalid-feedback">
                        {
                          esIsFieldError(
                            props.errors,
                            props.touched,
                            "receiveOption"
                          ).msg
                        }
                      </div>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}

                {receiveOption && receiveOption.value === "post_mail" ? (
                  <ShippingAddressFields
                    errors={props.errors}
                    touched={props.touched}
                    setFieldValue={props.setFieldValue}
                  />
                ) : (
                  ""
                )}

                {!helperIsEmpty(withDrawType) ? (
                  <BankDetailsFields
                    errors={props.errors}
                    touched={props.touched}
                    setFieldValue={props.setFieldValue}
                    bankStatus={withDrawType}
                  />
                ) : (
                  ""
                )}
                <Row className="withdraw-row">
                  <Col md={6}>
                    <Button type="submit">Save</Button>
                  </Col>
                </Row>
                <p>Errors</p>
                <pre>{JSON.stringify(props.errors, null, 2)}</pre>
                <p>Touch</p>
                <pre>{JSON.stringify(props.touched, null, 2)}</pre>
              </Form>
            );
          }}
        </Formik>
      </Col>
    </Row>
  );
};

WithDrawRequest.prototypes = {
  getAddWithDarawAction: PropTypes.func.isRequired,
  withdarawStatus: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    withdarwStatus: state.withdraw.addWithDarawStatus,
    withdarwStatus: state.withdraw.addWithDarawError,
  };
};

export default connect(mapStateToProps, { getAddWithDarawAction })(
  WithDrawRequest
);
