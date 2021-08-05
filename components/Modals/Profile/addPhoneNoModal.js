import { Field, Form, Formik } from "formik";
import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import Select from "react-select";

/**
 *
 * @param {@ boolean show, @ hideAction Func } params
 * @returns
 */
const AddPhoneNoModal = (params) => {
  console.log("AddPhoneNoModal params, ", params);

  return (
    <React.Fragment>
      <Modal show={params.show} onHide={params.hideAction}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={{
            country: "",
            phone_no: "",
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
            handleBlur
          }) => (
            <React.Fragment>
              <Modal.Body>
                <Form>
                  <Row>
                    <Col md={6}>
                      <label htmlFor="country">Country.</label>
                      <Select
                        name="country"
                        id="country"
                        onChange={(item)=>{
                            setFieldValue(`country`, item ? item.value : "");
                        }}

                        onBlur={handleBlur}
                       />
                    </Col>

                    <Col md={6}>
                      <label htmlFor="phone_no">Phone No.</label>
                      <Field className="form-control" type="text" name="phone_no" id="phone_no" />
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

export default AddPhoneNoModal;
