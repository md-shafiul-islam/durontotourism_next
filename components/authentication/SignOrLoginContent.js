import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

import { Card, Col, Container, Row } from "react-bootstrap";
import { getEsLoginResponseMessage } from "../../utils/ui/esLoginFunc";
import BasicActionLink from "../agent/BasicActionLink";
import SignInValidateField from "../Fields/SignInValidateField";
import SubmitActionButtion from "../Fields/SubmitActionButtion";

const SignOrLoginContent = (params) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const [loginStatus, setloginStatus] = useState(false);
  const [submitingStatus, setSubmitingStatus] = useState(false);

  console.log("Modal Window Login Current Url Route, ", router);

  const loginAction = async (loginData) => {
    console.log("Login ...");
    setSubmitingStatus(true);
    let loginResp = await signIn("credentials", {
      username: loginData.username,
      password: loginData.password,
      redirect: false,
      userStatus: "customer",
    });
    try {
      console.log("Login Success,");

      if (!loginResp.ok && loginResp.error != null) {
        setMessage(getEsLoginResponseMessage(loginResp));
        setloginStatus(loginResp.ok);
        setErrorStatus(true);
      } else {
        setMessage(getEsLoginResponseMessage(loginResp));
        setloginStatus(loginResp.ok);
        setErrorStatus(false);
        params.closeAction(false);
      }
      setSubmitingStatus(false);
    } catch (error) {
      // console.log("Sign In login, ", error);
      loginResp = error;
      setMessage(getEsLoginResponseMessage(loginResp));
      setErrorStatus(true);
      setloginStatus(loginResp.ok);
      setSubmitingStatus(false);
    }
    console.log("Login Response, ", loginResp);
  };

  const hideAction = () => {
    params.closeAction(false);
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
                            <SignInValidateField
                              {...props}
                              name="username"
                              className="form-control-lg"
                              placeholder="Enter email Or Phone"
                              status={loginStatus}
                              msg={message}
                              errorStatus={errorStatus}
                            />
                          </div>
                        </Row>
                        <Row className="input-area-row">
                          <div className="form-group">
                            <SignInValidateField
                              {...props}
                              type="password"
                              name="password"
                              clazzName="form-control-lg"
                              placeholder="Password"
                              status={loginStatus}
                              msg={message}
                              msgStatus={true}
                              errorStatus={errorStatus}
                            />
                          </div>
                        </Row>
                        <div className="row input-area-row">
                          <div className="col-md-12  d-grid">
                            <SubmitActionButtion
                              className=""
                              variant="primary"
                              label="Login"
                              isSubmitting={submitingStatus}
                            />
                          </div>
                          <div className="col-md-12 mt-4">
                            <Row>
                              <Col md={6}>
                                <BasicActionLink
                                  label="Forget Password ?"
                                  action={`/user/fogetpassword`}
                                  actionClick={hideAction}
                                />
                              </Col>
                              <Col
                                md={{ offset: 1, span: 5 }}
                                className="text-alr"
                              >
                                <BasicActionLink
                                  label="Register/Sign Up"
                                  action={`/signup`}
                                  actionClick={hideAction}
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
