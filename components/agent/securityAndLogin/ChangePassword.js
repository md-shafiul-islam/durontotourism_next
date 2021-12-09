import { Field, Formik, Form } from "formik";
import React from "react";
import { Button, Col, Row } from "react-bootstrap";

const ChangePassword = (props) => {
  return (
    <React.Fragment>
      <Formik
        initialValues={{
          prevPassword: "",
          pwd: "",
        }}
        onSubmit={(values, action) => {          
          props.submitAction(values);
        }}
      >
        {(props) => {
          return (
            <Form>
              <Row className="input-area-row">
                <Col md={12}>
                  <Field
                    name="prevPassword"
                    placeholder="Old password"
                    className="form-control"
                    id="prevPassword"
                    type="password"
                  />
                </Col>
              </Row>
              <Row className="input-area-row">
                <Col md={12}>
                  <Field
                    placeholder="New Password"
                    name="pwd"
                    id="pwd"
                    className="form-control"
                    type="password"
                  />
                </Col>
              </Row>
              <Row className="input-area-row">
                <Col md={12}>
                  <Button type="submit" className="form-control">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

export default ChangePassword;
