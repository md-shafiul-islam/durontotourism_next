import { Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import CstUploadFileFieldValidet from "../../Fields/CstUploadFileFieldValidet";
import CstValidateField from "../../Fields/CstValidateField";
import CstValidatePhoneNoField from "../../Fields/CstValidatePhoneNoField";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import * as Yup from "yup";
import { isEmptyString } from "../../../utils/helper/helperAction";
import { getMaxFileSizeValidation } from "../../../utils/helper/helperValidateSchema";
import { getUpdateAgentCompanyAction } from "../../../redux/actions/agentAction";
import CstSelectCountry from "../../Fields/CstSelectCountry";

const UpdateAgentCompanyInfo = (params) => {
  const { companyInf } = params;

  const [initStatus, setInitStatus] = useState(false);
  const initValues = {
    companyName: "Test ",
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
    companyLogoAttach: "",
    country: "",
  };
  const [initFormValues, setInitFormValues] = useState(initValues);
  useEffect(() => {
    setInitFormValues(initFormData());
    setInitStatus(true);
  }, [companyInf]);

  const getExistValue = (val) => {
    if (val !== null && val !== undefined) {
      return val;
    }
    return "";
  };

  const initFormData = () => {
    if (companyInf !== undefined && companyInf !== null) {
      return {
        companyName: getExistValue(companyInf.companyName),
        phone: getExistValue(companyInf.phone),
        code: getExistValue(companyInf.code),
        email: getExistValue(companyInf.email),
        houseOrVillage: getExistValue(companyInf.houseOrVillage),
        roadNameOrNo: getExistValue(companyInf.roadNameOrNo),
        postalCode: getExistValue(companyInf.postalCode),
        policeStation: getExistValue(companyInf.policeStation),
        districtOrCity: getExistValue(companyInf.districtOrCity),
        tradeLiceseno: getExistValue(companyInf.tradeLiceseno),
        tradeAttach: getExistValue(companyInf.tradeAttach),
        tinCertificateNo: getExistValue(companyInf.tinCertificateNo),
        tinAttach: getExistValue(companyInf.tinAttach),
        binCertificateNo: getExistValue(companyInf.binCertificateNo),
        binAttach: getExistValue(companyInf.binAttach),
        companyLogoAttach: getExistValue(companyInf.companyLogoAttach),
        country: getExistValue(companyInf.country),
      };
    }
    return initValues;
  };
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
          return Yup.mixed().required("Required, Please choose a file");
        }
      }),
      tinCertificateNo: Yup.string().min(0),

      tinAttach: Yup.mixed().when("tinCertificateNo", (v) => {
        if (!isEmptyString(v)) {
          return Yup.mixed().required("Required, Please choose a file");
        }
      }),
      binCertificateNo: Yup.string().min(0),
      binAttach: Yup.mixed().when("binCertificateNo", (v) => {
        if (!isEmptyString(v)) {
          return Yup.mixed().required("Required, Please choose a file");
        }
      }),

      companyLogoAttach: Yup.mixed().required(
        "Required, Please choose your company Logo"
      ),
    });
  };

  const submitAction = (upCompany) => {
    if (upCompany) {
      // upCompany = JSON.stringify(upCompany, null, 2);
      params.getUpdateAgentCompanyAction(upCompany);
      console.log("Update Company Submited...");
    }
  };
  return (
    <React.Fragment>
      {console.log("Initials Values, ", initStatus)}
      <Row>
        <Col md={12}>
          {initStatus === true ? (
            <Card className="company-update-container">
              {console.log(
                "Initials Values, Form ",
                initStatus,
                " Values, ",
                initFormValues
              )}
              <Card.Body className="update-content">
                <Formik
                  initialValues={initFormValues}
                  enableReinitialize={true}
                  validationSchema={validateSchema}
                  onSubmit={(values, action) => {
                    action.setSubmitting(true);
                    submitAction(values);
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
                              options={params.countryPhoneOptions}
                              clazzName="country-w-phone"
                              defaultValue="BH"
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
                            <CstSelectCountry
                              name="country"
                              onChange={(item) => {
                                let code = item ? item.value : null;
                                props.setFieldValue(`country`, code);
                              }}
                              blurHandler={() => {
                                props.setFieldTouched("country", true);
                              }}
                              options={params.countryOptions}
                              placeholder={"Select Country"}
                              defaultStringVal="AU"
                            />
                          </Col>
                          <Col md={6}>
                            <CstUploadFileFieldValidet
                              {...props}
                              name="companyLogoAttach"
                              placeholder="Attach Company Logo"
                              uploadFile={(file) => {
                                console.log("Upload File Runn ");
                              }}
                              isValidCheck={false}
                              previewStatus={false}
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
                                console.log("Upload File Runn ");
                              }}
                              isValidCheck={false}
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
                              isValidCheck={false}
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
                              isValidCheck={false}
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
          ) : (
            ""
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
};

UpdateAgentCompanyInfo.prototypes = {
  getUpdateAgentAction: PropTypes.func.isRequired,
  agent: PropTypes.object.isRequired,
  agentUpStatus: PropTypes.object.isRequired,
  agentError: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    agent: state.agent.upAgentCompany.agent,
    agentUpStatus: state.agent.upAgentCompany.upStatus,
    agentError: state.upCompanyError,
    companyInf: state.agent.loginAgent && state.agent.loginAgent.agentCompany,
    countryPhoneOptions: state.country.countryPhoneOptions,
    countryOptions: state.country.countryOptions,
  };
};

export default connect(mapStateToProps, { getUpdateAgentCompanyAction })(
  UpdateAgentCompanyInfo
);
