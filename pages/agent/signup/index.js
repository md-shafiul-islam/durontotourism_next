import { Form, Formik } from "formik";
import * as Yup from "yup";
import React, { Component } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import BasicActionLink from "../../../components/agent/BasicActionLink";
import CstValidateField from "../../../components/Fields/CstValidateField";
import CstValidatePhoneNoField from "../../../components/Fields/CstValidatePhoneNoField";

class getSignUpPage extends Component {
  validateSchema = () => {
    // companyName: "", optional
    // ownerName: "",
    // ownerEmail: "",
    // ownerPhone: "",

    return Yup.object().shape({
      applicantName: "",
      phoneNo: "",
      email: "",
      companyName: "",
      ownerName: "",
      ownerEmail: "",
      ownerPhone: "",
      pwd: "",
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
                      phoneNo: "",
                      email: "",
                      companyName: "",
                      ownerName: "",
                      ownerEmail: "",
                      ownerPhone: "",
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
                                  errors={props.errors}
                                  touched={props.touched}
                                  handleChange={props.handleChange}
                                  handleBlur={props.handleBlur}
                                />
                              </Col>
                              <Col md={12} className="field-area">
                                <CstValidatePhoneNoField
                                  fileldName="phone"
                                  codeName="phoneCode"
                                  filedPlaceholder="Phone"
                                  codePlaceholder="Code"
                                  errors={props.errors}
                                  touched={props.touched}
                                  handleChange={props.handleChange}
                                  handleBlur={props.handleBlur}
                                  setTouched={props.setFieldTouched}
                                  setFieldValue={props.setFieldValue}
                                />
                              </Col>

                              <Col md={12} className="field-area">
                                <CstValidateField
                                  name="email"
                                  placeholder="Email"
                                  errors={props.errors}
                                  touched={props.touched}
                                  handleChange={props.handleChange}
                                  handleBlur={props.handleBlur}
                                />
                              </Col>

                              <Col md={12} className="field-area">
                                <CstValidateField
                                  name="companyName"
                                  placeholder="Company Name"
                                  errors={props.errors}
                                  touched={props.touched}
                                  handleChange={props.handleChange}
                                  handleBlur={props.handleBlur}
                                />
                              </Col>

                              <Col md={12} className="field-area">
                                <CstValidateField
                                  name="ownerName"
                                  placeholder="Owner Name"
                                  errors={props.errors}
                                  touched={props.touched}
                                  handleChange={props.handleChange}
                                  handleBlur={props.handleBlur}
                                />
                              </Col>

                              <Col md={12} className="field-area">
                                <CstValidateField
                                  name="ownerEmail"
                                  placeholder="Email"
                                  errors={props.errors}
                                  touched={props.touched}
                                  handleChange={props.handleChange}
                                  handleBlur={props.handleBlur}
                                />
                              </Col>

                              <Col md={12} className="field-area">
                                <CstValidatePhoneNoField
                                  fileldName="ownerPhone"
                                  codeName="ownerPhoneCode"
                                  filedPlaceholder="Phone"
                                  codePlaceholder="Code"
                                  errors={props.errors}
                                  touched={props.touched}
                                  handleChange={props.handleChange}
                                  handleBlur={props.handleBlur}
                                  setTouched={props.setFieldTouched}
                                  setFieldValue={props.setFieldValue}
                                />
                              </Col>

                              <Col md={12} className="field-area">
                                <CstValidateField
                                  name="pwd"
                                  placeholder="Password"
                                  errors={props.errors}
                                  touched={props.touched}
                                  handleChange={props.handleChange}
                                  handleBlur={props.handleBlur}
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
                        </Form>
                      );
                    }}
                  </Formik>

                  <Row>
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
