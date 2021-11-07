import React from "react";
import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import { Col, Row } from "react-bootstrap";
import CstValidateField from "../components/Fields/CstValidateField";
import CstValidatePhoneNoField from "../components/Fields/CstValidatePhoneNoField";
import SubmitActionButtion from "../components/Fields/SubmitActionButtion";
import * as Yup from "yup";
import { PropTypes } from "prop-types";
import { connect, useDispatch } from "react-redux";
import { getAddSignUpAction } from "../redux/actions/signUpAction";
import { REST_USER_SIGNUP } from "../redux/types";

const GetSignupPage = (params) => {
  const router = useRouter();
  const dispatch = useDispatch();

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

  console.log("User Sign up Params, ", params);
  if (params.userSignUp.status) {
    console.log("Run Dispatch Fnc Comp, ", params.userSignUp.status);
    dispatch({
      type: REST_USER_SIGNUP,
      payload: true,
    });
    router.push("/verify/twostepverification");
  }

  return (
    <div className="user-signup-container">
      <div className="user-signup">
        <div className="title">Signup</div>
        <Row>
          <Col md={12}>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                phoneNo: "",
                code: "",
                password: "",
              }}
              validationSchema={validationScema}
              onSubmit={(values, action) => {
                action.setSubmitting(true);
                params.getAddSignUpAction(values);
              }}
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

const mapStateToProps = (state) => {
  return {
    userSignUp: state.signup.addSignUp,
  };
};

GetSignupPage.prototype = {
  getAddSignUpAction: PropTypes.func.isRequired,
  userSignUp: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getAddSignUpAction })(GetSignupPage);
