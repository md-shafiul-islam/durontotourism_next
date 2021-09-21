import React from "react";
import { Field } from "formik";
import { Button, Card, Col, Row } from "react-bootstrap";
import CstSelectValidateField from "../Fields/CstSelectValidateField";

const TravellerFields = ({
  isError,
  errors,
  touched,
  idx,
  fieldSetName,
  isInternational,
  setFieldTouched,
  setFieldValue,
  handleChange,
  handleBlur,
}) => {
  return (
    <React.Fragment>
      <Row className="input-area-row">
        <Col md={4}>
          <Field
            className={`form-control ${
              isError(fieldSetName, idx, errors, touched, "firstName").cls
            }`}
            type="text"
            name={`${fieldSetName}[${idx}].firstName`}
            placeholder="First Name..."
          />
          <div className="invalid-feedback">
            {isError(fieldSetName, idx, errors, touched, "firstName").msg}
          </div>
        </Col>

        <Col md={4}>
          <Field
            className="form-control"
            type="text"
            name={`${fieldSetName}[${idx}].lastName`}
            placeholder="Last Name..."
          />
        </Col>
        <Col md={4}>
          <div
            className={`gender-info ${
              isError(fieldSetName, idx, errors, touched, "gender").cls
            }`}
          >
            <label className="gender-label">
              <Field
                type="radio"
                name={`${fieldSetName}[${idx}].gender`}
                value="Male"
                id={`${fieldSetName}[${idx}].gender-male`}
              />
              <span className="gen-text">Male</span>
            </label>

            <label className="gender-label">
              <Field
                type="radio"
                name={`${fieldSetName}[${idx}].gender`}
                value="Female"
                id={`${fieldSetName}[${idx}].gender-female`}
              />
              <span className="gen-text">Female</span>
            </label>
          </div>

          <div className="invalid-feedback">
            {isError(fieldSetName, idx, errors, touched, "gender").msg}
          </div>
        </Col>
      </Row>
      {isInternational ? (
        <React.Fragment>
          <Row className="input-area-row">
            <Col md={4}>
              <CstSelectValidateField
                name="nationality"
                label="Nationality"
                placeholder="Nationality"
                clazzName={
                  isError(fieldSetName, idx, errors, touched, "nationality").cls
                }
                errorMsg={
                  isError(fieldSetName, idx, errors, touched, "nationality").msg
                }
                onChange={(item) => {
                  setFieldValue(`nationality`, item && item.value);
                }}
                handleBlur={handleBlur}
              />
            </Col>

            <Col md={4}>
              <label className="form-label">Date of birth</label>
              <Row>
                <Col md={4} className="mp-0">
                  <CstSelectValidateField
                    name="dobDate"
                    placeholder="date"
                    clazzName={
                      isError(fieldSetName, idx, errors, touched, "dobDate").cls
                    }
                    errorMsg={
                      isError(fieldSetName, idx, errors, touched, "dobDate").msg
                    }
                  />
                </Col>
                <Col md={4} className="mp-0">
                  <CstSelectValidateField
                    name="dobMonth"
                    placeholder="Month"
                    clazzName={
                      isError(fieldSetName, idx, errors, touched, "dobMonth").cls
                    }
                    errorMsg={
                      isError(fieldSetName, idx, errors, touched, "dobMonth").msg
                    }
                  />
                </Col>
                <Col md={4} className="mp-0">
                  <CstSelectValidateField
                    name="dobYear"
                    placeholder="Year"
                    clazzName={
                      isError(fieldSetName, idx, errors, touched, "dobYear").cls
                    }
                    errorMsg={
                      isError(fieldSetName, idx, errors, touched, "dobYear").msg
                    }
                  />
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className="input-area-row">
            <Col md={4}>
              <CstSelectValidateField
                name="passportNo"
                label="Passport No."
                placeholder="Passport No."
                clazzName={
                  isError(fieldSetName, idx, errors, touched, "passportNo").cls
                }
                errorMsg={
                  isError(fieldSetName, idx, errors, touched, "passportNo").msg
                }
              />
            </Col>
            <Col md={4}>
              <CstSelectValidateField
                name="passportIssuCountry"
                label="Passport Issuing Country"
                placeholder="Passport Issuing Country"
                clazzName={
                  isError(
                    fieldSetName,
                    idx,
                    errors,
                    touched,
                    "passportIssuCountry"
                  ).cls
                }
                errorMsg={
                  isError(
                    fieldSetName,
                    idx,
                    errors,
                    touched,
                    "passportIssuCountry"
                  ).msg
                }
              />
            </Col>
            <Col md={4}>
              <label className="form-label">Passport Expiry Date</label>
              <Row>
                <Col md={4} className="mp-0">
                  <CstSelectValidateField
                    name="pasExpDate"
                    placeholder="date"
                    clazzName={
                      isError(fieldSetName, idx, errors, touched, "pasExpDate")
                        .cls
                    }
                    errorMsg={
                      isError(fieldSetName, idx, errors, touched, "pasExpDate")
                        .msg
                    }
                  />
                </Col>
                <Col md={4} className="mp-0">
                  <CstSelectValidateField
                    name="pasExpMonth"
                    placeholder="Month"
                    clazzName={
                      isError(fieldSetName, idx, errors, touched, "pasExpMonth")
                        .cls
                    }
                    errorMsg={
                      isError(fieldSetName, idx, errors, touched, "pasExpMonth")
                        .msg
                    }
                  />
                </Col>
                <Col md={4} className="mp-0">
                  <CstSelectValidateField
                    name="pasExpYear"
                    placeholder="Year"
                    clazzName={
                      isError(fieldSetName, idx, errors, touched, "pasExpYear")
                        .cls
                    }
                    errorMsg={
                      isError(fieldSetName, idx, errors, touched, "pasExpYear")
                        .msg
                    }
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </React.Fragment>
      ) : (
        ""
      )}
      <p>Error</p>
      <pre>{JSON.stringify(errors, null, 2)}</pre>
      <p>Touched</p>
      <pre>{JSON.stringify(touched, null, 2)}</pre>
    </React.Fragment>
  );
};

export default TravellerFields;
