import React, { useState } from "react";

import { Form, Formik } from "formik";
import { Card, Col, Row, Button } from "react-bootstrap";
import CstSelectValidateField from "../../Fields/CstSelectValidateField";
import CstUploadFileFieldValidet from "../../Fields/CstUploadFileFieldValidet";
import CstValidateField from "../../Fields/CstValidateField";
import CstValidatePhoneNoField from "../../Fields/CstValidatePhoneNoField";

const UpdateAgentOwnerInfo = (params) => {
  const [countries, setCountries] = useState();
  return (
    <React.Fragment>
      <Row>
        <Col md={12}>
          <Card>
            <Card.Title>Update Agent Company Information</Card.Title>
            <Card.Body>
              <Formik
                initialValues={{
                  name: "",
                  phone: "",
                  code: "",
                  email: "",
                  houseNoOrVillage: "",
                  roadNameOrNo: "",
                  postalCode: "",
                  policeStation: "",
                  district: "",
                  country: "",
                  nationalIdNo: "",
                  passportNo: "",
                }}
                onSubmit={(values, action) => {
                  console.log("Update Agent Info");
                }}
              >
                {(props) => {
                  return (
                    <Form>
                      <Row className="input-area-row">
                        <Col md={6}>
                          <CstValidateField
                            placeholder="Name"
                            name="name"
                            errors={props.errors}
                            touched={props.touched}
                            handleChange={props.handleChange}
                            handleBlur={props.handleBlur}
                          />
                        </Col>
                        <Col md={6}>
                          <CstValidatePhoneNoField
                            {...props}
                            fileldName="phone"
                            codeName="code"
                            filedPlaceholder="Phone"
                            codePlaceholder="Code"
                          />
                        </Col>
                      </Row>

                      <Row className="input-area-row">
                        <Col md={6}>
                          <CstValidateField
                            placeholder="Email"
                            name="email"
                            errors={props.errors}
                            touched={props.touched}
                            handleChange={props.handleChange}
                            handleBlur={props.handleBlur}
                          />
                        </Col>
                        <Col md={6}>
                          <CstValidateField
                            placeholder="House No/Village"
                            name="houseNoOrVillage"
                            errors={props.errors}
                            touched={props.touched}
                            handleChange={props.handleChange}
                            handleBlur={props.handleBlur}
                          />
                        </Col>
                      </Row>

                      <Row className="input-area-row">
                        <Col md={6}>
                          <CstValidateField
                            placeholder="Road Name Or No."
                            name="roadNameOrNo"
                            errors={props.errors}
                            touched={props.touched}
                            handleChange={props.handleChange}
                            handleBlur={props.handleBlur}
                          />
                        </Col>
                        <Col md={6}>
                          <CstValidateField
                            placeholder="Postal Code"
                            name="postalCode"
                            errors={props.errors}
                            touched={props.touched}
                            handleChange={props.handleChange}
                            handleBlur={props.handleBlur}
                          />
                        </Col>
                      </Row>

                      <Row className="input-area-row">
                        <Col md={6}>
                          <CstValidateField
                            placeholder="Police Station"
                            name="policeStation"
                            errors={props.errors}
                            touched={props.touched}
                            handleChange={props.handleChange}
                            handleBlur={props.handleBlur}
                          />
                        </Col>
                        <Col md={6}>
                          <CstValidateField
                            placeholder="District Or City"
                            name="districtOrCity"
                            errors={props.errors}
                            touched={props.touched}
                            handleChange={props.handleChange}
                            handleBlur={props.handleBlur}
                          />
                        </Col>
                      </Row>

                      <Row className="input-area-row">
                        <Col md={6}>
                          <CstSelectValidateField
                            name="country"
                            placeholder="Select One Country"
                            options={countries}
                            onChange={props.changeHandler}
                            blurHandler={props.blurHandler}
                            clazzName={"is-Valid"}
                            errorMsg="Is Have Error"
                          />
                        </Col>
                      </Row>

                      <Row className="input-area-row">
                        <Col md={6}>
                          <CstValidateField
                            placeholder="National ID No."
                            name="nationalIdNo"
                            errors={props.errors}
                            touched={props.touched}
                            handleChange={props.handleChange}
                            handleBlur={props.handleBlur}
                          />
                        </Col>
                        <Col md={6}>
                          <CstUploadFileFieldValidet
                            {...props}
                            name="nationalIdAttach"
                            placeholder="Attach National ID image Or Scan copy"
                            uploadFile={(file) => {
                              console.log(
                                "nationalIdAttach Upload File Change, ",
                                file
                              );
                            }}
                          />
                        </Col>
                      </Row>

                      <Row className="input-area-row">
                        <Col md={6}>
                          <CstValidateField
                            placeholder="Passport No."
                            name="passportNo"
                            errors={props.errors}
                            touched={props.touched}
                            handleChange={props.handleChange}
                            handleBlur={props.handleBlur}
                          />
                        </Col>
                        <Col md={6}>
                          <CstUploadFileFieldValidet
                            {...props}
                            name="passportAttach"
                            placeholder="Attach Passport  image Or Scan copy"
                            uploadFile={(file) => {
                              console.log(
                                "passportAttach Upload File Change, ",
                                file
                              );
                            }}
                          />
                        </Col>
                      </Row>
                      <Row className="input-area-row">
                        <Col md={{ span: 4, offset: 8 }} className="d-grid">
                          <Button type="submit" variant="success">
                            Submit
                          </Button>
                        </Col>
                      </Row>
                    </Form>
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

export default UpdateAgentOwnerInfo;
