import { Field, Form, Formik } from "formik";
import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";

/**
 *
 * @param {@ boolean show, @ hideAction Func } params
 * @returns
 */
const ChangePasswordModal = (params) => {
  console.log("ChangePasswordModal params, ", params);
  return (
    <React.Fragment>
      <Modal show={params.show} onHide={params.hideAction}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={{
            old_pass: "",
            password: "",
            c_password: "",
          }}
        >
          {({
            setFieldTouched,
            setFieldValue,
            handleChange,
            validateOnBlur,
            values,
            errors,
            touched,
          }) => (
            <React.Fragment>
              <Modal.Body className="md-change-pass">
                <Form>
                  
                    <Row>
                      <Col md={5} >
                        <label htmlFor="old_pass">Old Password.</label>
                      </Col>
                      <Col md={7}>
                        <Field className="form-control" type="password" name="old_pass" id="old_pass" />
                      </Col>
                    </Row>

                    <Row>
                      <Col md={5}>
                        <label htmlFor="password">New Password.</label>
                      </Col>
                      <Col md={7}>
                        <Field className="form-control" type="password" name="password" id="password" />
                      </Col>
                    </Row>

                    <Row>
                      <Col md={5}>
                        <label htmlFor="name">Confirm Password.</label>
                      </Col>
                      <Col md={7}>
                        <Field
                          className="form-control"
                          type="password"
                          name="c_password"
                          id="c_password"
                        />
                      </Col>
                    </Row>
                  
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={params.hideAction}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={params.hideAction}
                  type="submit"
                >
                  Save
                </Button>
              </Modal.Footer>
            </React.Fragment>
          )}
        </Formik>
      </Modal>
    </React.Fragment>
  );
};

export default ChangePasswordModal;
