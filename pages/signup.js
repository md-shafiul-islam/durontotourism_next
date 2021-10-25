import React from "react";
import { Form, Formik } from "formik";
import { Col, Row } from "react-bootstrap";
import CstValidateField from "../components/Fields/CstValidateField";
import CstValidatePhoneNoField from "../components/Fields/CstValidatePhoneNoField";
import SubmitActionButtion from "../components/Fields/SubmitActionButtion";
import * as Yup from "yup";

const GetSignupPage = (params) => {
  const validationScema = () => {
    return Yup.object().shape({
      firstName: Yup.string().required("Please, Enter First Name "),
      lastName: Yup.string().required("Please, Enter Last Name "),
      email: Yup.string()
        .email("Please Enter valide Email")
        .required("Email is Required"),
      phoneNo: Yup.string()
        .min(10, "Please Enter Phone No.")
        .required("Phone No is required"),
      code: Yup.string()
        .min(1, "Please Enter code ")
        .required("Code is required"),
      password: Yup.string()
        .min(8, "Password Minimum 8 or more letter, number or any character")
        .required("Password is required"),
    });
  };
  return (
    <div className="user-signup-container">
      <div className="user-signup">
        <div className="title">User Signup</div>
        <Row>
          <Col md={12}>
            <Formik
              initialValues={{
                firstName:"",
                lastName:"",
                email: "",
                phoneNo: "",
                code: "",
                password: "",
              }}
              validationSchema={validationScema}
            >
              {(props) => {
                return (
                  <Form>
                  <Col md={12} className="field-area">
                      <CstValidateField
                        name="firstName"
                        placeholder="First Name"
                        {...props}
                      />
                    </Col>

                    <Col md={12} className="field-area">
                      <CstValidateField
                        name="lastName"
                        placeholder="Last Name"
                        {...props}
                      />
                    </Col>

                    <Col md={12} className="field-area">
                      <CstValidateField
                        name="email"
                        placeholder="Email"
                        {...props}
                      />
                    </Col>

                    <Col md={12} className="field-area">
                      <CstValidatePhoneNoField
                        {...props}
                        fileldName="phoneNo"
                        codeName="code"
                        filedPlaceholder="Phone"
                        codePlaceholder="Code"
                        options={[{ label: "BD", value: "bd" }]}
                      />
                    </Col>

                    <Col md={12} className="field-area">
                      <CstValidateField
                        name="password"
                        placeholder="Password"
                        type="password"
                        {...props}
                      />
                    </Col>
                    <Col md={12} className="d-grid">
                      <SubmitActionButtion
                        label="Submit"
                        variant="success"
                        isSubmitting={props.isSubmitting}
                      />
                    </Col>
                  </Form>
                );
              }}
            </Formik>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default GetSignupPage;
