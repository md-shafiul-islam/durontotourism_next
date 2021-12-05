/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import { Form, Formik } from "formik";
import * as Yup from "yup";
import { connect, useDispatch } from "react-redux";
import { PropTypes } from "prop-types";
import { Card, Col, Row, Button } from "react-bootstrap";
import CstUploadFileFieldValidet from "../../Fields/CstUploadFileFieldValidet";
import CstValidateField from "../../Fields/CstValidateField";
import CstValidatePhoneNoField from "../../Fields/CstValidatePhoneNoField";
import {
  helperIsEmpty,
  isEmptyString,
} from "../../../utils/helper/helperAction";
import { getMaxFileSizeValidation } from "../../../utils/helper/helperValidateSchema";
import {
  getCurrentAgentAction,
  getUpdateAgentOwnerAction,
} from "../../../redux/actions/agentAction";
import CstSelectCountry from "../../Fields/CstSelectCountry";
import LoaderSpiner from "../../../utils/helper/loaderSpiner";
import { REST_AGENT_OWNER_UPDATE } from "../../../redux/types";

const UpdateAgentOwnerInfo = (params) => {
  const [initStatus, setInitStatus] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (submitStatus && !helperIsEmpty(params.agentUpdate)) {
      if (params.agentUpdate.status) {
        if (params.agentUpdate.status) {
          dispatch({
            type: REST_AGENT_OWNER_UPDATE,
            payload: true,
          });
          params.getCurrentAgentAction();
          setSubmitStatus(false);
          params.actionClose && params.actionClose(false);
        }
      }
    }
  }, [params.agentUpdate]);

  const initValues = {
    id: "",
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
    passportAttach: "",
    nationalIdAttach: "",
    ownerImage: "",
  };
  const [initFormValues, setInitFormValues] = useState(initValues);
  useEffect(() => {
    setInitFormValues(initFormData());
    setInitStatus(true);
  }, []);

  const getExistValue = (val) => {
    if (val !== null && val !== undefined) {
      return val;
    }
    return "";
  };

  const initFormData = () => {
    if (params.owner !== undefined && params.owner !== null) {
      return {
        id: getExistValue(params.owner.publicId),
        name: getExistValue(params.owner.name),
        phone: getExistValue(params.owner.phone),
        code: getExistValue(params.owner.code),
        email: getExistValue(params.owner.email),
        houseNoOrVillage: getExistValue(params.owner.houseNoOrVillage),
        roadNameOrNo: getExistValue(params.owner.roadNameOrNo),
        postalCode: getExistValue(params.owner.postalCode),
        policeStation: getExistValue(params.owner.policeStation),
        district: getExistValue(params.owner.district),
        country: getExistValue(params.owner.country),
        nationalIdNo: getExistValue(params.owner.nationalIdNo),
        passportNo: getExistValue(params.owner.passportNo),
        passportAttach: getExistValue(params.owner.passportAttach),
        nationalIdAttach: getExistValue(params.owner.nationalIdAttach),
        ownerImage: getExistValue(params.owner.ownerImage),
      };
    }
    return initValues;
  };
  const validationSchema = () => {
    return Yup.object().shape({
      name: Yup.string().required("Please, Enter Owner name"),
      phone: Yup.string().required("Please, Enter Phone No."),
      code: Yup.string().required(
        "Please, Select one dail code or Phone code."
      ),
      email: Yup.string()
        .email("Please, Enter valid Email address Or ID.")
        .required("Please, Enter Owner Email."),
      houseNoOrVillage: Yup.string()
        .min(0)
        .typeError("Value Must be text or number"),
      roadNameOrNo: Yup.string()
        .min(0)
        .typeError("Value Must be text or number"),
      postalCode: Yup.string().min(0).typeError("Value Must be text or number"),
      policeStation: Yup.string()
        .min(0)
        .typeError("Value Must be text or number"),
      district: Yup.string().min(0).typeError("Value Must be text or number"),
      country: Yup.string().min(0).typeError("Value Must be text or number"),
      nationalIdNo: Yup.string()
        .min(0)
        .typeError("Value Must be text or number"),

      nationalIdAttach: Yup.mixed().when("nationalIdNo", (v) => {
        if (!isEmptyString(v)) {
          return getMaxFileSizeValidation(375, "National ID");
        }
      }),
      passportNo: Yup.string().min(0).typeError("Value Must be text or number"),

      passportAttach: Yup.mixed().when("passportNo", (v) => {
        if (!isEmptyString(v)) {
          return getMaxFileSizeValidation(450, "Passport");
        }
      }),
      ownerImage: getMaxFileSizeValidation(500, "Owner Image"),
    });
  };

  const submitAction = (values) => {
    console.log("Curent Owner Value ", values);
    params.getUpdateAgentOwnerAction(values);
    setSubmitStatus(true);
  };
  return (
    <React.Fragment>
      <LoaderSpiner loadingText="Update Agent Owner ..." show={submitStatus} />
      <Row>
        <Col md={12}>
          <Card>
            {initStatus ? (
              <Card.Body>
                <Formik
                  initialValues={initFormValues}
                  validationSchema={validationSchema}
                  onSubmit={(values, action) => {
                    submitAction(values);
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
                            />
                          </Col>
                        </Row>
                        <Row className="input-area-row">
                          <Col md={6}>
                            <CstValidateField
                              placeholder="Email"
                              name="email"
                              {...props}
                            />
                          </Col>
                          <Col md={6}>
                            <CstValidateField
                              placeholder="House No/Village"
                              name="houseNoOrVillage"
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
                              name="district"
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
                              defaultStringVal="BD"
                            />
                          </Col>
                          <Col md={6}>
                            <CstUploadFileFieldValidet
                              {...props}
                              name="ownerImage"
                              placeholder="Attach Owner image"
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
                              placeholder="National ID No."
                              name="nationalIdNo"
                              checkIsValid={false}
                              {...props}
                              isFieldHaveValue={(value) => {
                                if (!isEmptyString(value)) {
                                  setNationalAttach(true);
                                } else {
                                  setNationalAttach(false);
                                }
                              }}
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
                              isValidCheck={false}
                            />
                          </Col>
                        </Row>
                        <Row className="input-area-row">
                          <Col md={6}>
                            <CstValidateField
                              placeholder="Passport No."
                              name="passportNo"
                              checkIsValid={false}
                              {...props}
                            />
                          </Col>
                          <Col md={6}>
                            <CstUploadFileFieldValidet
                              {...props}
                              name="passportAttach"
                              placeholder="Attach Passport image Or Scan copy"
                              uploadFile={(file) => {
                                console.log("Upload File Runn ");
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
                        Error:
                        <pre>{JSON.stringify(props.errors, null, 2)}</pre>
                      </Form>
                    );
                  }}
                </Formik>
              </Card.Body>
            ) : (
              "Geting data..."
            )}
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

UpdateAgentOwnerInfo.prototype = {
  getUpdateAgentOwnerAction: PropTypes.func.isRequired,
  agentOwners: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    agentOwners: state.agent.agentOwners,
    countryPhoneOptions: state.country.countryPhoneOptions,
    countryOptions: state.country.countryOptions,
    agentUpdate: state.agent.upAgentOwner,
  };
};

export default connect(mapStateToProps, {
  getUpdateAgentOwnerAction,
  getCurrentAgentAction,
})(UpdateAgentOwnerInfo);
