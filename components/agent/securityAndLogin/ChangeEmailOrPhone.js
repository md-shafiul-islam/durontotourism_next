import { Field, Form, Formik } from "formik";
import React from "react";
import { Col, Row } from "react-bootstrap";
import CstValidatePhoneNoField from "../../Fields/CstValidatePhoneNoField";
import CstValidateField from "../../Fields/CstValidateField";
import SubmitActionButtion from "../../Fields/SubmitActionButtion";
import * as Yup from "yup";

const ChangeEmailOrPhone = ({
  email = "",
  phone = "",
  code = "",
  submitAction,
  type = 0,
  options = [],
}) => {


  const initValues = () => {
    if (type === 0) {
      return { email: email };
    }
    if (type === 1) return { phone: phone, code: code };
  };

  const validationSchema = () => {
    if (type === 0) {
      return Yup.object().shape({
        email: Yup.string()
          .email("Enter Valid email address Or ID")
          .required("Required. Please Enter you email"),
      });
    }

    if (type === 1) {
      return Yup.object().shape({
        phone: Yup.string().required("Please Enter phone No."),
        code: Yup.string().required("Please Select dial Or calling code"),
      });
    }
  };

  return (
    <React.Fragment>
      <Formik
        initialValues={initValues}
        validationSchema={validationSchema}
        onSubmit={(values, action) => {
          action.setSubmitting(true);
          submitAction(values);          
        }}
      >
        {(props) => {
          return (
            <Form>
              <React.Fragment>
                {type === 0 ? (
                  <Row className="input-area-row">
                    <Col md={12}>
                      <CstValidateField
                        {...props}
                        name="email"
                        placeholder="Email"
                      />
                    </Col>
                  </Row>
                ) : (
                  <Row className="input-area-row">
                    <Col md={12}>
                      <CstValidatePhoneNoField
                        {...props}
                        fileldName="phone"
                        codeName="code"
                        filedPlaceholder="Phone"
                        codePlaceholder="Code"
                        options={options}
                      />
                    </Col>
                  </Row>
                )}

                <Row className="input-area-row">
                  <Col md={12} className="d-grid">
                    <SubmitActionButtion
                      label="Update"
                      variant="success"
                      isSubmitting={props.isSubmitting}
                    />
                  </Col>
                </Row>
              </React.Fragment>
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

export default ChangeEmailOrPhone;
