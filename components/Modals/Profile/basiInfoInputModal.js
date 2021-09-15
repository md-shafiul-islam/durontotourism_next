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
            initialValues={{name:"", birthday:"", gender:"", maritals_status:""}}
        >
          {({setFieldTouched, setFieldValue, handleChange, validateOnBlur, values, errors, touched}) => (
            <React.Fragment>
              <Modal.Body>
                <Form>
                    <Row>
                        <Col md={6}>
                            <label htmlFor="name">Full Name.</label>
                            <Field
                                type="text"
                                name="name"
                                id="name"
                            />
                        </Col>

                        <Col md={6}>
                            <label htmlFor="gender">Gender.</label>
                            <Field
                                type="text"
                                name="gender"
                                id="gender"
                            />
                        </Col>

                        <Col md={6}>
                            <label htmlFor="name">Maritals Status.</label>
                            <Field
                                type="text"
                                name="maritals_status"
                                id="maritals_status"
                            />
                        </Col>

                        <Col md={6}>
                            <label htmlFor="birthday">Birthday</label>
                            <Field
                                type="date"
                                name="birthday"
                                id="birthday"
                            />
                        </Col>
                    </Row>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={params.hideAction}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={params.hideAction} type="submit">
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
