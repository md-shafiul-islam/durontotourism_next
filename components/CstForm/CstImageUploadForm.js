import { Form, Formik } from "formik";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { getMaxFileSizeValidation } from "../../utils/helper/helperValidateSchema";
import CstValidateField from "../Fields/CstValidateField";
import SubmitActionButtion from "../Fields/SubmitActionButtion";
import * as Yup from "yup";
import CstUploadFileFieldValidet from "../Fields/CstUploadFileFieldValidet";

const CstImageUploadForm = (params) => {
  const validationSchema = () => {
    return Yup.object().shape({
      image: getMaxFileSizeValidation(800, "Profile Image"),
    });
  };

  return (
    <React.Fragment>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ image: "" }}
        onSubmit={(values, actions) => {
            console.log("Current Selected Image, ", values);
          params.submitAction(values);
          actions.setSubmitting(false);
        }}
      >
        {(props) => (
          <Form>
            <Row className="input-area-row">
              <Col md={12}>
                <CstUploadFileFieldValidet
                  name="image"
                  {...props}
                  label="Please, Select Profile image"
                  accept=".png, .jpg, .svg"
                />
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

export default CstImageUploadForm;
