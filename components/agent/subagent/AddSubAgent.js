import { Form, Formik } from "formik";
import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import CstValidateField from "../../Fields/CstValidateField";
import CstValidatePhoneNoField from "../../Fields/CstValidatePhoneNoField";
import UpdateAgentCompanyInfo from "../profile/UpdateAgentCompanyInfo";
import UpdateAgentOwnerInfo from "../profile/UpdateAgentOwnerInfo";

const AddSubAgent = (params) => {
  return (
    <React.Fragment>
      <Card>
        <Card.Body>
          <Row>
            <Col md={12}>
              <Formik>
                {(props) => {
                  return (
                    <Form>
                      <Row className="input-area-row">
                        <Col md={6}>
                          <CstValidateField
                            placeholder="Agent ID"
                            name="agentId"
                            errors={props.errors}
                            touched={props.touched}
                            handleChange={props.handleChange}
                            handleBlur={props.handleBlur}
                          />
                        </Col>
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
                            placeholder="Password"
                            name="pwd"
                            errors={props.errors}
                            touched={props.touched}
                            handleChange={props.handleChange}
                            handleBlur={props.handleBlur}
                          />
                        </Col>
                      </Row>
                      <Row className="input-area-row">
                        <Col md={{ span: 4, offset: 4 }} className="d-grid">
                          <Button type="submit" variant="success">
                            Submit
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  );
                }}
              </Formik>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <UpdateAgentCompanyInfo />
      <UpdateAgentOwnerInfo />
    </React.Fragment>
  );
};

export default AddSubAgent;
