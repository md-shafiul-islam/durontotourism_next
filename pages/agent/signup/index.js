import React, { Component } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import BasicActionLink from "../../../components/agent/BasicActionLink";
import CstValidateField from "../../../components/Fields/CstValidateField";
import CstValidatePhoneNoField from "../../../components/Fields/CstValidatePhoneNoField";
import {
  esIsFieldError,
  esIsPhoneFieldError,
} from "../../../utils/helper/helperAction";
import { getNmsOptions } from "../../../utils/helper/esFnc";

class getSignUpPage extends Component {
  validateSchema = () => {
    // companyName: "", optional
    // ownerName: "",
    // ownerEmail: "",
    // ownerPhone: "",

    return Yup.object().shape({
      applicantName: Yup.string().required(
        "Required. Please, Enter applicant name."
      ),
      phone: Yup.string().required(
        "Required. Please, Enter applicant Phone Number."
      ),
      phoneCode: Yup.string().when("phone", (v) => {
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
                      phoneCode: "",
                      phoneNo: "",
                      email: "",
                      companyName: "",
                      ownerName: "",
                      ownerEmail: "",
                      ownPhone: "",
                      ownCode: "",
                      pwd: "",
                    }}
                    validationSchema={this.validateSchema()}
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
                                  clazzName={
                                    esIsPhoneFieldError(
                                      props.errors,
                                      props.touched,
                                      `phone`,
                                      `code`
                                    ).cls
                                  }
                                  errorMsg={
                                    esIsPhoneFieldError(
                                      props.errors,
                                      props.touched,
                                      `phone`,
                                      `code`
                                    ).msg
                                  }
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
                                  clazzName={
                                    esIsPhoneFieldError(
                                      props.errors,
                                      props.touched,
                                      `ownPhone`,
                                      `ownCode`
                                    ).cls
                                  }
                                  errorMsg={
                                    esIsPhoneFieldError(
                                      props.errors,
                                      props.touched,
                                      `ownerPhone`,
                                      `ownerPhoneCode`
                                    ).msg
                                  }
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
                                <Button
                                  type="submit"
                                  variant="success"
                                  className="signup-btn"
                                >
                                  sign up
                                </Button>
                              </Col>
                            </Row>
                          </React.Fragment>
                          <pre>{JSON.stringify(props.errors, null, 2)}</pre>
                          <br />
                          <br />
                          Touched
                          <br />
                          <pre>{JSON.stringify(props.touched, null, 2)}</pre>
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

export default getSignUpPage;
