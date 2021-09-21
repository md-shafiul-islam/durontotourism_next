import { Field, Form, Formik } from "formik";
import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";

const BasiInfoInputModal = (params) => {
  return (
    <React.Fragment>
      <Modal show={params.show} onHide={params.hideAction}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={{
            name: "",
            birthday: "",
            gender: "",
            maritals_status: "",
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
              <Modal.Body>
                <Form>
                  <Row>
                    <Col md={6}>
                      <label className="form-label" htmlFor="name">
                        First Name.
                      </label>
                      <Field
                        className="form-control"
                        type="text"
                        name="firstName"
                        id="firstName"
                      />
                    </Col>
                    <Col md={6}>
                      <label className="form-label" htmlFor="lastName">
                        Last Name.
                      </label>
                      <Field
                        className="form-control"
                        type="text"
                        name="lastName"
                        id="lastName"
                      />
                    </Col>
                    <Col md={6}>
                      <label className="form-label" htmlFor="phoneNo">
                        Phone Number.
                      </label>
                      <Field
                        className="form-control"
                        type="text"
                        name="phoneNo"
                        id="phoneNo"
                      />
                    </Col>

                    <Col md={6}>
                      <label className="form-label" htmlFor="email">
                        Email
                      </label>
                      <Field
                        className="form-control"
                        type="email"
                        name="email"
                        id="email"
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

export default BasiInfoInputModal;
