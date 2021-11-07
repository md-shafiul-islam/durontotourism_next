import { Field, Form, Formik } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import BasicActionLink from "../agent/BasicActionLink";
import SubmitActionButtion from "../Fields/SubmitActionButtion";

const SignOrLoginContent = (params) => {
  const router = useRouter();

  console.log("Modal Window Login Current Url Route, ", router);

  const loginAction = (loginData) => {
      
    signIn("credentials", {
      username: loginData.username,
      password: loginData.password,
      callbackUrl: `${window.origin}${router.pathname}`,
      userStatus: 'customer'
    });
  };
  return (
    <React.Fragment>
      <Row>
        <Col md={12} className="login-area">
          <Card className="login-card">
            <Card.Body>            
              <Formik
                initialValues={{
                  username: "",
                  password: "",
                }}
                onSubmit={(values, action) => {
                  loginAction(values);
                }}
              >
                {(props) => {
                  return (
                    <React.Fragment>
                      <Form>
                        <Row className="input-area-row">
                          <div className="form-group">
                            <Field
                              type="text"
                              name="username"
                              className="form-control form-control-lg"
                              placeholder="Enter email Or Phone"
                            />
                          </div>
                        </Row>
                        <Row className="input-area-row">
                          <div className="form-group">
                            <Field
                              type="password"
                              name="password"
                              className="form-control form-control-lg"
                              placeholder="Password"
                            />
                          </div>
                        </Row>
                        <div className="row input-area-row">
                          <div className="col-md-12  d-grid">
                            <SubmitActionButtion
                              className=""
                              variant="primary"
                              label="Login"
                              isSubmitting={props.isSubmitting}
                            />
                          </div>
                          <div className="col-md-12 mt-4">
                            <Row>
                              <Col md={6}>
                                <BasicActionLink
                                  label="Forget Password ?"
                                  action={`/user/fogetpassword`}
                                />
                              </Col>
                              <Col
                                md={{ offset: 1, span: 5 }}
                                className="text-alr"
                              >
                                <BasicActionLink
                                  label="Register/Sign Up"
                                  action={`/signup`}
                                />
                              </Col>
                            </Row>
                          </div>
                        </div>
                      </Form>
                    </React.Fragment>
                  );
                }}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default SignOrLoginContent;
