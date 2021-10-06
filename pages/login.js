import { Field, Form, Formik } from "formik";
import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import BasicActionLink from "../components/agent/BasicActionLink";

const GetLoginPage = (params) => {
  return (
    <React.Fragment>
      <Container className="user-login-container">
        <Col md={{ offset: 3, span: 6 }} className="login-area">
          <Card className="login-card">
            <Card.Body>
              <div className="login-title">User Login</div>

              <Formik
                initialValues={{
                  userName: "",
                  password: "",
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
                            <button
                              type="submit"
                              className="btn btn-block btn-success "
                            >
                              Log In
                            </button>
                          </div>
                        </div>
                        <Row className="input-area-row">
                          <Col md={6} className=" d-grid">
                            <button
                              type="submit"
                              className="btn btn-block btn-danger "
                            >
                              Login with Gmail
                            </button>
                          </Col>
                          <Col md={6} className=" d-grid">
                            <button
                              type="submit"
                              className="btn btn-block btn-primary "
                            >
                              Login with Facebook
                            </button>
                          </Col>
                        </Row>

                        <Row>
                          <div className="col-md-12 mt-4">
                            <Row>
                              <Col md={6}>
                                <BasicActionLink
                                  label="Forget Password ?"
                                  action={`/agent/fogetpassword`}
                                />
                              </Col>
                              <Col
                                md={{ offset: 1, span: 5 }}
                                className="text-alr"
                              >
                                <BasicActionLink
                                  label="Register/Sign Up"
                                  action={`/agent/signup`}
                                />
                              </Col>
                            </Row>
                          </div>
                        </Row>
                      </Form>
                    </React.Fragment>
                  );
                }}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Container>
    </React.Fragment>
  );
};



export default GetLoginPage;
