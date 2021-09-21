import { Field, Form, Formik } from "formik";
import React from "react";
import { Col, Row } from "react-bootstrap";
import Select from "react-select";
import { esIsFieldError } from "../../utils/helper/helperAction";
import CstValidateField from "../Fields/CstValidateField";
import * as Yup from "yup";
import CstRadioButton from "../Fields/CstRadioButton";

const ProfileBookingInfForm = (params) => {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().min(3).required("Required, Enter First & Middle name "),
    lastName: Yup.string().typeError("Enter Only Latter"),    
    gender: Yup.string().required("You Must Select one option"),

    nationality: Yup.string().when("isInternational", {
      is:true,
      then:Yup.string().required("You Must Select one nationality")
    }),    
    dateOfBirth: Yup.string().when("isInternational", {
      is:true,
      then:Yup.string().required("You Must Enter, Traveler Date Of Birth")
    }),
    passportNo: Yup.string().when("isInternational", {
      is:true,
      then:Yup.string().required("You Must Enter, Traveler passport number")
    }),
    issuCuntry: Yup.string().when("isInternational", {
      is:true,
      then:Yup.string().required("You Must Enter, Traveler passport issuing country")
    }),
    passportExpiry: Yup.string().when("isInternational", {
      is:true,
      then:Yup.string().required("You Must Enter, Traveler passport expiry date")
    }),

    email: Yup.string().when("isExtend", {
      is:true,
      then: Yup.string().email().required("You Must Enter you email"),
    }),
    phoneNo: Yup.string().when("isExtend", {
      is:true,
      then:Yup.string().min(3).required("You Must enter phone")
    }),
  });

  return (
    <React.Fragment>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          firstName: "",
          lastName: "",
          nationality: "",
          gender: "",
          dateOfBirth: "",
          passportNo: "",
          issuCuntry: "",
          passportExpiry: "",
          email: "",
          phoneNo: "",
          isExtend:params.isExtendedField,
          isInternational:params.isInternational,
        }}
      >
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
                <Col md={6} className="cst-radio">
                  <CstRadioButton 
                    name="gender"
                    idKey="trvl"
                    errors={props.errors}
                    touched={props.touched}
                    handleChange={props.handleChange}
                    handleBlur={props.handleBlur}
                  />
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

              {params.isExtendedField ? (
                <React.Fragment>
                  <Row className="card-pay-row">
                    <Col md={6}>
                      <CstValidateField
                        label="Email"
                        placeholder="Email"
                        name="email"
                        handleChange={props.handleChange}
                        handleBlur={props.handleBlur}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Col>
                    <Col md={6}>
                      <CstValidateField
                        label="Phone No."
                        placeholder="Phone Number"
                        name="phoneNo"
                        handleChange={props.handleChange}
                        handleBlur={props.handleBlur}
                        errors={props.errors}
                        touched={props.touched}
                      />
                    </Col>
                  </Row>
                </React.Fragment>
              ) : (
                ""
              )}
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

export default ProfileBookingInfForm;
