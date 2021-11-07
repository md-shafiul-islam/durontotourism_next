import React from "react";
import { getSession, signIn } from "next-auth/react";
import { Field, Form, Formik } from "formik";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { Card, Col, Container, Row } from "react-bootstrap";

import BasicActionLink from "../../../components/agent/BasicActionLink";
import SubmitActionButtion from "../../../components/Fields/SubmitActionButtion";
import { getUserLogin } from "../../../redux/actions/userAction";

const GetLoginPage = (params) => {
  const route = useRouter();
  params.login && params.login.success ? route.push("/agent") : "";
  console.log("Next Router, ", route);
  
  const loginAction = (loginData) => {
    signIn("credentials", {
      username: loginData.username,
      password: loginData.password,
      callbackUrl: `${window.origin}${router.pathname}/agent`,
      userStatus: "agent",
    });
  };
  return (
    <React.Fragment>
      <Container className="agent-login-container">
        <Col md={{ offset: 3, span: 6 }} className="login-area">
          <Card className="login-card">
            <Card.Body>
              <div className="login-title">Agent Login</div>

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
                        </div>
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

GetLoginPage.prototype = {
  getUserLogin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    login: state.login.loginResp,
    loginError: state.login.loginError,
  };
};

export async function getServerSideProps(context) {
  let session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {userType:"Agent"},
  };
}

export default connect(mapStateToProps, { getUserLogin })(GetLoginPage);
