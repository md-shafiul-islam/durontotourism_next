import { Form, Formik } from "formik";
import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import CstUploadFileFieldValidet from "../../Fields/CstUploadFileFieldValidet";
import CstValidateField from "../../Fields/CstValidateField";
import CstValidatePhoneNoField from "../../Fields/CstValidatePhoneNoField";
import * as Yup from "yup";
import {
  esIsFile,
  esIsPhoneFieldError,
  isEmptyString,
} from "../../../utils/helper/helperAction";
import { fileValidateSchema, getMaxFileSizeValidation } from "../../../utils/helper/helperValidateSchema";

const UpdateAgentCompanyInfo = (params) => {
  const validateSchema = () => {
    return Yup.object().shape({
      companyName: Yup.string().min(0),
      phone: Yup.string().min(0),
      phoneCode: Yup.string().min(0),
      email: Yup.string().email("Please Enter valid Email").min(0),
      houseOrVillage: Yup.string().min(0),
      roadNameOrNo: Yup.string().min(0),
      postalCode: Yup.string().min(0),
      policeStation: Yup.string().min(0),
      districtOrCity: Yup.string().min(0),
      tradeLiceseno: Yup.string().min(0),
      tradeAttach: Yup.mixed().when("tradeLiceseno", (v) => {
        if (!isEmptyString(v)) {
          return getMaxFileSizeValidation(300);
        }
      }),
      tinCertificateNo: Yup.string().min(0),
      tinAttach: Yup.mixed().when("tinCertificateNo", (v) => {
        if (!isEmptyString(v)) {
          return getMaxFileSizeValidation(300);
        }
      }),
      binCertificateNo: Yup.string().min(0),
      binAttach: Yup.mixed().when("binCertificateNo", (v) => {
        console.log("If Bin Input , ", v);
        if (!isEmptyString(v)) {
          return getMaxFileSizeValidation(300);
        }
      }),
    });
  };

  return (
    <React.Fragment>
      <Row>
        <Col md={12}>
          <Card>
            <Card.Title>Update Agent Company Information</Card.Title>
            <Card.Body>
              <Formik
                initialValues={{
                  companyName: "",
                  phone: "",
                  code: "",
                  email: "",
                  houseOrVillage: "",
                  roadNameOrNo: "",
                  postalCode: "",
                  policeStation: "",
                  districtOrCity: "",
                  tradeLiceseno: "",
                  tradeAttach: "",
                  tinCertificateNo: "",
                  tinAttach: "",
                  binCertificateNo: "",
                  binAttach: "",
                }}
                validationSchema={validateSchema}
                onSubmit={(values, action) => {
                  console.log("Update Agent Company Action Run :) ");
                }}
              >
                {(props) => {
                  return (
                    <Form>
                      <Row className="input-area-row">
                        <Col md={6}>
                          <CstValidateField
                            placeholder="Company Name"
                            name="companyName"
                            checkIsValid={false}
                            {...props}
                          />
                        </Col>
                        <Col md={6}>
                          <CstValidatePhoneNoField
                            {...props}
                            fileldName="phone"
                            codeName="code"
                            filedPlaceholder="Phone"
                            codePlaceholder="Code"
                            clazzName={
                              esIsPhoneFieldError(
                                props.errors,
                                props.touched,
                                `phone`,
                                `code`
                              ).cls
                            }
                            errorMsg={
                              esIsPhoneFieldError(
                                props.errors,
                                props.touched,
                                `phone`,
                                `code`
                              ).msg
                            }
                          />
                        </Col>
                      </Row>
                      <Row className="input-area-row">
                        <Col md={6}>
                          <CstValidateField
                            placeholder="Email"
                            name="email"
                            checkIsValid={false}
                            {...props}
                          />
                        </Col>
                        <Col md={6}>
                          <CstValidateField
                            placeholder="House No/Village"
                            name="houseOrVillage"
                            checkIsValid={false}
                            {...props}
                          />
                        </Col>
                      </Row>
                      <Row className="input-area-row">
                        <Col md={6}>
                          <CstValidateField
                            placeholder="Road Name Or No."
                            name="roadNameOrNo"
                            checkIsValid={false}
                            {...props}
                          />
                        </Col>
                        <Col md={6}>
                          <CstValidateField
                            placeholder="Postal Code"
                            name="postalCode"
                            checkIsValid={false}
                            {...props}
                          />
                        </Col>
                      </Row>
                      <Row className="input-area-row">
                        <Col md={6}>
                          <CstValidateField
                            placeholder="Police Station"
                            name="policeStation"
                            checkIsValid={false}
                            {...props}
                          />
                        </Col>
                        <Col md={6}>
                          <CstValidateField
                            placeholder="District Or City"
                            name="districtOrCity"
                            checkIsValid={false}
                            {...props}
                          />
                        </Col>
                      </Row>
                      <Row className="input-area-row">
                        <Col md={6}>
                          <CstValidateField
                            placeholder="Trade License No."
                            name="tradeLiceseno"
                            checkIsValid={false}
                            {...props}
                          />
                        </Col>
                        <Col md={6}>
                          <CstUploadFileFieldValidet
                            {...props}
                            name="tradeAttach"
                            placeholder="Attach Trade License image Or Scan copy"
                            uploadFile={(file) => {
                              console.log(
                                "tradeAttach Upload File Change, ",
                                file
                              );
                              props.setFieldValue(`tradeAttach`, file);
                            }}
                          />
                        </Col>
                      </Row>
                      <Row className="input-area-row">
                        <Col md={6}>
                          <CstValidateField
                            placeholder="TIN Certificate No."
                            name="tinCertificateNo"
                            checkIsValid={false}
                            {...props}
                          />
                        </Col>
                        <Col md={6}>
                          <CstUploadFileFieldValidet
                            {...props}
                            name="tinAttach"
                            placeholder="Attach TIN  Certificate image Or Scan copy"
                            uploadFile={(file) => {
                              console.log(
                                "tradeAttach Upload File Change, ",
                                file
                              );
                            }}
                          />
                        </Col>
                      </Row>
                      <Row className="input-area-row">
                        <Col md={6}>
                          <CstValidateField
                            placeholder="BIN Certificate No."
                            name="binCertificateNo"
                            checkIsValid={false}
                            {...props}
                          />
                        </Col>
                        <Col md={6}>
                          <CstUploadFileFieldValidet
                            {...props}
                            name="binAttach"
                            placeholder="Attach BIN  Certificate image Or Scan copy"
                            uploadFile={(file) => {
                              console.log(
                                "tradeAttach Upload File Change, ",
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
                      Error:
                      <pre>{JSON.stringify(props.errors, null, 2)}</pre>
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
