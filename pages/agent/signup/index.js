import React, { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Card, Col, Container, Row } from "react-bootstrap";
import BasicActionLink from "../../../components/agent/BasicActionLink";
import CstValidateField from "../../../components/Fields/CstValidateField";
import CstValidatePhoneNoField from "../../../components/Fields/CstValidatePhoneNoField";

import SubmitActionButtion from "../../../components/Fields/SubmitActionButtion";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getAddAgentSignUpAction } from "../../../redux/actions/signUpAction";
import { getCountryPhonCodeOptions } from "../../../redux/actions/countriyAction";
import { signIn } from "next-auth/react";
import { useRouter } from "next/dist/client/router";

const GetSignUpPage = (params) => {
  const [submitStatus, setSubmitStatus] = useState(false);
  const [signUpDetails, setSignUpDetails] = useState(false);
  const router = useRouter();

  useEffect(() => {
    initCountryPhoneCode();
  }, []);

  useEffect(() => {
    if (params.agentSignUp) {
      console.log("Agent SignUp Resp ", params.agentSignUp);

      if (params.agentSignUp.status) {
        loginAction();
      }
    }
  }, [params.agentSignUp]);

  const loginAction = async () => {
    console.log("Agent login action ... ");
    const loginResp = await signIn("credentials", {
      username: signUpDetails.email,
      password: signUpDetails.pwd,
      redirect: false,
      userStatus: "agent",
    });

    if (loginResp.ok) {
      router.push("/agent")
    }

    console.log("Login Response ", loginResp);
  };

  const initCountryPhoneCode = () => {
    if (params.countryOptions !== undefined && params.countryOptions !== null) {
      if (params.countryOptions.length === 0) {
        params.getCountryPhonCodeOptions();
      }
    } else {
      params.getCountryPhonCodeOptions();
    }
  };

  const submitAction = (signUp) => {
    console.log("Sign Up Values, ", signUp);
    setSignUpDetails(signUp);
    params.getAddAgentSignUpAction(signUp);
  };

  const validateSchema = () => {
    return Yup.object().shape({
      applicantName: Yup.string().required(
        "Required. Please, Enter applicant name."
      ),
      phone: Yup.string().required(
        "Required. Please, Enter applicant Phone Number."
      ),
      code: Yup.string().when("phone", (v) => {
        if (v !== null || v !== "") {
          return Yup.string(2).required(
            "Required. Please, Select One Phone Code."
          );
        }
      }),
      email: Yup.string()
        .email("You must enter valid email ID.")
        .required("Required. Please, Enter applicant Phone Number."),
      companyName: Yup.string().min(0),

      ownerName: Yup.string().min(0),
      ownerEmail: Yup.string().min(0),
      ownPhone: Yup.string().min(0),
      ownCode: Yup.string().min(0),
      pwd: Yup.string()
        .min(6, "Password minmum contains 6 Latter, Number Or Mixed")
        .required("Required. Please Enter Password"),
    });
  };
  return (
    <React.Fragment>
      <Container className="agent-container">
        <div className="agent-signup">
          <Col md={12} clas>
            <Card>
              <Card.Body className="signup-card">
                <div className="signup-title">Agent Registration</div>

                <Formik
                  initialValues={{
                    applicantName: "",
                    code: "",
                    phone: "",
                    email: "",
                    companyName: "",
                    ownerName: "",
                    ownerEmail: "",
                    ownPhone: "",
                    ownCode: "",
                    pwd: "",
                  }}
                  validationSchema={validateSchema}
                  onSubmit={(values, action) => {
                    console.log("Sign Up Action ", action);

                    action.setSubmitting(true);
                    submitAction(values);
                  }}
                >
                  {(props) => {
                    return (
                      <Form>
                        <React.Fragment>
                          <Row className="agentsgn-form-area">
                            <Col md={12} className="field-area">
                              <CstValidateField
                                name="applicantName"
                                placeholder="Applicant Name"
                                {...props}
                              />
                            </Col>
                            <Col md={12} className="field-area">
                              <CstValidatePhoneNoField
                                {...props}
                                fileldName="phone"
                                codeName="code"
                                filedPlaceholder="Phone"
                                codePlaceholder="Code"
                                options={params.countryOptions}
                              />
                            </Col>

                            <Col md={12} className="field-area">
                              <CstValidateField
                                {...props}
                                name="email"
                                placeholder="Email"
                              />
                            </Col>

                            <Col md={12} className="field-area">
                              <CstValidateField
                                {...props}
                                name="companyName"
                                placeholder="Company Name"
                                checkIsValid={false}
                              />
                            </Col>

                            <Col md={12} className="field-area">
                              <CstValidateField
                                name="ownerName"
                                placeholder="Owner Name"
                                {...props}
                                checkIsValid={false}
                              />
                            </Col>

                            <Col md={12} className="field-area">
                              <CstValidateField
                                {...props}
                                name="ownerEmail"
                                placeholder="Email"
                                checkIsValid={false}
                              />
                            </Col>

                            <Col md={12} className="field-area">
                              <CstValidatePhoneNoField
                                {...props}
                                fileldName="ownPhone"
                                codeName="ownCode"
                                filedPlaceholder="Phone"
                                codePlaceholder="Code"
                                checkIsValid={false}
                                options={params.countryOptions}
                              />
                            </Col>

                            <Col md={12} className="field-area">
                              <CstValidateField
                                name="pwd"
                                type="password"
                                placeholder="Password"
                                {...props}
                              />
                            </Col>

                            <Col md={12} className="d-grid">
                              <SubmitActionButtion
                                variant="success"
                                className="signup-btn"
                                label="sign up"
                                isSubmitting={props.isSubmitting}
                              />
                            </Col>
                          </Row>
                        </React.Fragment>
                      </Form>
                    );
                  }}
                </Formik>

                <Row className="mt-2">
                  <Col md={6}>
                    Existing User?{" "}
                    <BasicActionLink label="Log in" action={`/agent/login`} />{" "}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </div>
      </Container>
    </React.Fragment>
  );
};

GetSignUpPage.prototypes = {
  getAddAgentSignUpAction: PropTypes.func.isRequired,
  getCountryPhonCodeOptions: PropTypes.func.isRequired,
  agentSignUp: PropTypes.object.isRequired,
  countryPhoneOptions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    agentSignUp: state.agent && state.agent.agentSignUp,
    countryOptions: state.country.countryPhoneOptions,
  };
};

export default connect(mapStateToProps, {
  getAddAgentSignUpAction,
  getCountryPhonCodeOptions,
})(GetSignUpPage);
