import React, { Component } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Card, Col, Container, Row } from "react-bootstrap";
import BasicActionLink from "../../../components/agent/BasicActionLink";
import CstValidateField from "../../../components/Fields/CstValidateField";
import CstValidatePhoneNoField from "../../../components/Fields/CstValidatePhoneNoField";

import { getNmsOptions } from "../../../utils/helper/esFnc";
import SubmitActionButtion from "../../../components/Fields/SubmitActionButtion";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getAddSignUpAction } from "../../../redux/actions/signUpAction";

class GetSignUpPage extends Component {
  submitAction = (signUp) => {
    console.log("Sign Up Values, ", signUp);
    this.props.getAddSignUpAction(JSON.stringify(signUp));
  };

  validateSchema = () => {
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
  render() {
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
                    validationSchema={this.validateSchema}
                    onSubmit={(values, action) => {
                      console.log("Sign Up Action ", action);

                      action.setSubmitting(true);
                      this.submitAction(values);
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
                                  options={getNmsOptions(20, 1, 0)}
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

                    <Col md={6}>
                      <BasicActionLink
                        action={`/agent/foget`}
                        label="Foget Password?"
                      />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

GetSignUpPage.prototypes = {
  getAddSignUpAction: PropTypes.func.isRequired,
  signUpStatus: PropTypes.object.isRequired,
  signUpError: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    signUpStatus: state.signup.addSignUp && state.signup.addSignUp.status,
    signUpError: state.signup.addSignUp && state.signup.addSignUp.msg,
    signUp: state.signup.addSignUp && state.signup.addSignUp.signUp,
  };
};

export default connect(mapStateToProps, { getAddSignUpAction })(GetSignUpPage);
