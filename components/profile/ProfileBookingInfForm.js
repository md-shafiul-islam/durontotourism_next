import { Field, Form, Formik } from "formik";
import React from "react";
import { Col, Row } from "react-bootstrap";
import Select from "react-select";
import { esIsFieldError } from "../../utils/helper/helperAction";
import CstValidateField from "../Fields/CstValidateField";

const ProfileBookingInfForm = (params) => {
  return (
    <React.Fragment>
      <Formik>
        {(props) => {
          return (
            <Form>
              <Row className="card-pay-row">
                <Col md={6}>
                  <CstValidateField
                    label="First & Middle name."
                    placeholder="First & Middle name."
                    name="firstName"
                    handleChange={props.handleChange}
                    handleBlur={props.handleBlur}
                    errors={props.errors}
                    touched={props.touched}
                  />
                </Col>
                <Col md={6}>
                  <CstValidateField
                    label="Last Name."
                    placeholder="Last Name."
                    name="lastName"
                    handleChange={props.handleChange}
                    handleBlur={props.handleBlur}
                    errors={props.errors}
                    touched={props.touched}
                  />
                </Col>
              </Row>

              <Row className="card-pay-row">
                <Col md={6}>
                  <label className="form-label" htmlFor="nationality">
                    Nationality{" "}
                  </label>
                  <Select
                    placeholder="Nationality"
                    name={`nationality`}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    id={`nationality`}
                    className={`${
                      esIsFieldError(props.errors, props.touched, "nationality")
                        .cls
                    }`}
                  />
                  <div className="invalid-feedback">
                    {
                      esIsFieldError(props.errors, props.touched, "nationality")
                        .msg
                    }
                  </div>
                </Col>
                <Col md={6}>
                  <div
                    className={`gender-info ${
                      esIsFieldError(props.errors, props.touched, "gender").cls
                    }`}
                  >
                    <label className="gender-label">
                      <Field
                        type="radio"
                        name={`gender`}
                        value="Male"
                        id={`gender-male`}
                      />
                      <span className="gen-text">Male</span>
                    </label>

                    <label className="gender-label">
                      <Field
                        type="radio"
                        name={`gender`}
                        value="Female"
                        id={`gender-female`}
                      />
                      <span className="gen-text">Female</span>
                    </label>
                  </div>

                  <div className="invalid-feedback">
                    {esIsFieldError(props.errors, props.touched, "gender").msg}
                  </div>
                </Col>
              </Row>

              <Row className="card-pay-row">
                <Col md={6}>
                  <CstValidateField
                    label="Date Of Birth."
                    placeholder="Date Of Birth."
                    name="dateOfBirth"
                    handleChange={props.handleChange}
                    handleBlur={props.handleBlur}
                    errors={props.errors}
                    touched={props.touched}
                  />
                </Col>
                <Col md={6}>
                  <CstValidateField
                    label="Passport No"
                    placeholder="Passport Number"
                    name="passportNo"
                    handleChange={props.handleChange}
                    handleBlur={props.handleBlur}
                    errors={props.errors}
                    touched={props.touched}
                  />
                </Col>
              </Row>

              <Row className="card-pay-row">
                <Col md={6}>
                  <label className="form-label" htmlFor="issuCuntry">
                    Passport Issuing Country{" "}
                  </label>
                  <Select
                    placeholder="country"
                    name={`issuCuntry`}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    id={`issuCuntry`}
                    className={`${
                      esIsFieldError(props.errors, props.touched, "issuCuntry")
                        .cls
                    }`}
                  />
                  <div className="invalid-feedback">
                    {
                      esIsFieldError(props.errors, props.touched, "issuCuntry")
                        .msg
                    }
                  </div>
                </Col>
                <Col md={6}>
                  <CstValidateField
                    label="Passport Expiry"
                    placeholder="Passport Expiry"
                    name="passportExpiry"
                    handleChange={props.handleChange}
                    handleBlur={props.handleBlur}
                    errors={props.errors}
                    touched={props.touched}
                  />
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

export default ProfileBookingInfForm;
