import { Form, Formik } from "formik";
import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import CstUploadFileFieldValidet from "../../Fields/CstUploadFileFieldValidet";
import CstValidateField from "../../Fields/CstValidateField";
import CstValidatePhoneNoField from "../../Fields/CstValidatePhoneNoField";

const UpdateAgentCompanyInfo = (params) => {
  return (
    <React.Fragment>
      <Row>
        <Col md={12}>
          <Card>
            <Card.Title>Update Agent Company Information</Card.Title>
            <Card.Body>
              <Formik>
                {(props) => {
                  return (
                    <Form>
                      <Row className="input-area-row">
                        <Col md={6}>
                          <CstValidateField
                            placeholder="Company Name"
                            name="companyName"
                            errors={props.errors}
                            touched={props.touched}
                            handleChange={props.handleChange}
                            handleBlur={props.handleBlur}
                          />
                        </Col>
                        <Col md={6}>
                          <CstValidatePhoneNoField
                            fileldName="phone"
                            codeName="phoneCode"
                            filedPlaceholder="Phone"
                            codePlaceholder="Code"
                            errors={props.errors}
                            touched={props.touched}
                            handleChange={props.handleChange}
                            handleBlur={props.handleBlur}
                            setTouched={props.setFieldTouched}
                            setFieldValue={props.setFieldValue}
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
                            name="houseOrVillage"
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
                          <CstValidateField
                            placeholder="Trade License No."
                            name="tradeLiceseno"
                            errors={props.errors}
                            touched={props.touched}
                            handleChange={props.handleChange}
                            handleBlur={props.handleBlur}
                          />
                        </Col>
                        <Col md={6}>
                          <CstUploadFileFieldValidet
                            name="tradeAttach"
                            placeholder="Attach Trade License image Or Scan copy"
                            blurHandler={() => {
                              setFieldTouched(`tradeAttach`, true);
                            }}
                            changeHandler={(file) => {
                              setFieldValue(file);
                            }}
                          />
                        </Col>
                      </Row>

                      <Row className="input-area-row">
                        <Col md={6}>
                          <CstValidateField
                            placeholder="TIN Certificate No."
                            name="tinCertificateNo"
                            errors={props.errors}
                            touched={props.touched}
                            handleChange={props.handleChange}
                            handleBlur={props.handleBlur}
                          />
                        </Col>
                        <Col md={6}>
                          <CstUploadFileFieldValidet
                            name="tinAttach"
                            placeholder="Attach TIN  Certificate image Or Scan copy"
                            blurHandler={() => {
                              setFieldTouched(`tinAttach`, true);
                            }}
                            changeHandler={(file) => {
                              setFieldValue(file);
                            }}
                          />
                        </Col>
                      </Row>

                      <Row className="input-area-row">
                        <Col md={6}>
                          <CstValidateField
                            placeholder="BIN Certificate No."
                            name="binCertificateNo"
                            errors={props.errors}
                            touched={props.touched}
                            handleChange={props.handleChange}
                            handleBlur={props.handleBlur}
                          />
                        </Col>
                        <Col md={6}>
                          <CstUploadFileFieldValidet
                            name="binAttach"
                            placeholder="Attach BIN  Certificate image Or Scan copy"
                            blurHandler={() => {
                              setFieldTouched(`binAttach`, true);
                            }}
                            changeHandler={(file) => {
                              setFieldValue(file);
                            }}
                          />
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

export default UpdateAgentCompanyInfo;
