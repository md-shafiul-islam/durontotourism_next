/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Form, Formik } from "formik";
import { Col, Row } from "react-bootstrap";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import CstValidatePhoneNoField from "../Fields/CstValidatePhoneNoField";
import { getCountryOptions } from "../../redux/actions/countriyAction";
import { initCountryOptions } from "../../utils/ui/esFuncs";
import CstSelectPhoneValidateField from "../Fields/CstSelectPhoneValidateField";
import SubmitActionButtion from "../Fields/SubmitActionButtion";

const SinglePhoneForm = (params) => {
  useEffect(() => {
    initCountryOptions(params);
  }, []);

  return (
    <React.Fragment>
      <Formik
        initialValues={{ phoneNo: "", code: "" }}
        onSubmit={(values, actions) => {
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
                  options={params.countryOptions}
                  clazzName="country-w-phone"
                />
              </Col>
            </Row>
            <Row className="input-area-row">
              <Col md={{ span: 4, offset: 8 }} className="d-grid">
                <SubmitActionButtion className="single-phone-action"
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
    countryOptions: state.country.countryOptions,
  };
};

SinglePhoneForm.prototype = {
  getCountryOptions: PropTypes.func.isRequired,
  countryOptions: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getCountryOptions })(SinglePhoneForm);
