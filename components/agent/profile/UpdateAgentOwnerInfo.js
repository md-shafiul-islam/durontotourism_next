import React, { useState } from "react";

import { Form, Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Card, Col, Row, Button } from "react-bootstrap";
import CstSelectValidateField from "../../Fields/CstSelectValidateField";
import CstUploadFileFieldValidet from "../../Fields/CstUploadFileFieldValidet";
import CstValidateField from "../../Fields/CstValidateField";
import CstValidatePhoneNoField from "../../Fields/CstValidatePhoneNoField";
import { isEmptyString } from "../../../utils/helper/helperAction";
import { getMaxFileSizeValidation } from "../../../utils/helper/helperValidateSchema";
import { getUpdateAgentOwnerAction } from "../../../redux/actions/agentAction";

const UpdateAgentOwnerInfo = (params) => {
  const [countries, setCountries] = useState();

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

  return (
    <React.Fragment>
      <Row>
        <Col md={12}>
          <Card>
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
                  passportAttach: "",
                  nationalIdAttach: "",
                  ownerImage: "",
                }}
                validationSchema={validationSchema}
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
                            name="districtOrCity"
                            checkIsValid={false}
                            {...props}
                          />
                        </Col>
                      </Row>
                      <Row className="input-area-row">
                        <Col md={6}>
                          <CstSelectValidateField
                            name="country"
                            placeholder="Select One Country"
                            options={countries}
                            checkIsValid={false}
                            {...props}
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
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

UpdateAgentOwnerInfo.prototype = {
  getUpdateAgentOwnerAction:PropTypes.func.isRequired,
  agentOwners:PropTypes.object.isRequired,
}


const mapStateToProps = (state)=>{
  return{
    agentOwners:state.agent.agentOwners
  }
}

export default connect(mapStateToProps, {getUpdateAgentOwnerAction})(UpdateAgentOwnerInfo);
