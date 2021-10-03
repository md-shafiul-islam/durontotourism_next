import { Field, Formik } from "formik";
import React from "react";
import { Button, Col, Row } from "react-bootstrap";

const ChangePassword = (props)=> {
  return (
    <React.Fragment>
      <Formik
        initialValues={{
          prePassword: "",
          nPassword: "",
        }}
      >
        {(props) => {
          return (
            <React.Fragment>
              <Row className="input-area-row">
                <Col md={12}>
                  <Field
                    name="prevPassword"
                    placeholder="Old password"
                    className="form-control"
                    id="prevPassword"
                  />
                </Col>
              </Row>
              <Row className="input-area-row">
                <Col md={12}>
                  <Field
                    placeholder="New Password"
                    name="nPassword"
                    id="nPassword"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row className="input-area-row">
                <Col md={12}>
                  <Button type="submit" className="form-control">Submit</Button>
                </Col>
              </Row>
            </React.Fragment>
          );
        }}
      </Formik>
    </React.Fragment>
  );
}

export default ChangePassword;