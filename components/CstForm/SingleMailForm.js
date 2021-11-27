/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Form, Formik } from "formik";
import { Col, Row } from "react-bootstrap";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import CstValidatePhoneNoField from "../Fields/CstValidatePhoneNoField";
import { getCountryPhonCodeOptions } from "../../redux/actions/countriyAction";
import { iniPhoneCountryOptions } from "../../utils/ui/esFuncs";
import SubmitActionButtion from "../Fields/SubmitActionButtion";
import CstValidateField from "../Fields/CstValidateField";
import * as Yup from "yup";

const SingleMailForm = (params) => {
  const validationSchema = () => {
    return Yup.object().shape({
      email: Yup.string()
        .email("Please, Enter valid Email")
        .required("You nust enter mail"),
    });
  };

  return (
    <React.Fragment>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ email: "" }}
        onSubmit={(values, actions) => {
          params.submitAction(values);
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {(props) => (
          <Form>
            <Row className="input-area-row">
              <Col md={12}>
                <CstValidateField name="email" placeholder="Email" {...props} />
                <span>{params.message}</span>
              </Col>

            </Row>
            <Row className="input-area-row">
              <Col md={{ span: 4, offset: 8 }} className="d-grid">
                <SubmitActionButtion
                  className="single-phone-action"
                  label="Submit"
                  isSubmitting={props.isSubmitting}
                />
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    countryPhoneOptions: state.country.countryPhoneOptions,
  };
};

SingleMailForm.prototype = {
  getCountryPhonCodeOptions: PropTypes.func.isRequired,
  countryPhoneOptions: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getCountryPhonCodeOptions })(
  SingleMailForm
);
