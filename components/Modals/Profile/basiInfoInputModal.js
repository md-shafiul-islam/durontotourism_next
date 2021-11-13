/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect}from "react";
import { Field, Form, Formik } from "formik";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import CstValidatePhoneNoField from "../../Fields/CstValidatePhoneNoField";
import { helperIsEmpty } from "../../../utils/helper/helperAction";
import { getCountryOptions } from "../../../redux/actions/countriyAction";

const BasiInfoInputModal = (params) => {
  
  useEffect(() => {
    if(!helperIsEmpty(params.countryOptions)){
      if(params.countryOptions.length === 0){
        params.getCountryOptions();
      }
    }
  }, [])
  
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
          {(props) => (
            <React.Fragment>
              <Modal.Body>
                <Form>
                  <Row className="input-area-row">
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
                  </Row>
                  <Row className="input-area-row">
                    <Col md={12}>
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
                  <Row className="input-area-row">
                    <Col md={12}>
                      <label className="form-label" htmlFor="phoneNo">
                        Phone Number.
                      </label>
                      <CstValidatePhoneNoField
                        {...props}
                        fileldName="phoneNo"
                        codeName="code"
                        filedPlaceholder="Phone"
                        codePlaceholder="Code"
                        options={params.countryOptions}
                        clazzName="country-w-phone"
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

BasiInfoInputModal.prototype = {
  getCountryOptions: PropTypes.func.isRequired,  
  countryOptions: PropTypes.object.isRequired,
};

const mapStateToProps = (state)=>{
  return {
    countryOptions: state.country.countryOptions,
  }
}

export default connect(mapStateToProps, {getCountryOptions})(BasiInfoInputModal);
