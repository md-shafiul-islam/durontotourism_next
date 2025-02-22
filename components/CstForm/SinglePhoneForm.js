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

const SinglePhoneForm = (params) => {
  useEffect(() => {
    iniPhoneCountryOptions(params);
  }, []);

  return (
    <React.Fragment>
      <Formik
        initialValues={{ phoneNo: "", code: "" }}
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
                <CstValidatePhoneNoField
                  {...props}
                  fileldName="phoneNo"
                  codeName="code"
                  filedPlaceholder="Phone"
                  codePlaceholder="Code"
                  options={params.countryPhoneOptions}
                  clazzName="country-w-phone"
                />
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

SinglePhoneForm.prototype = {
  getCountryPhonCodeOptions: PropTypes.func.isRequired,
  countryPhoneOptions: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getCountryPhonCodeOptions })(
  SinglePhoneForm
);
