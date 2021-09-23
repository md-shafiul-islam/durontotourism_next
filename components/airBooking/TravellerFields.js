import React from "react";
import { Field } from "formik";
import { Button, Card, Col, Row } from "react-bootstrap";
import CstSelectValidateField from "../Fields/CstSelectValidateField";
import { getNmsOptions } from "../../utils/helper/esFnc";
import CstValidateField from "../Fields/CstValidateField";
import CstUploadFileFieldValidet from "../Fields/CstUploadFileFieldValidet";

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
                name={`${fieldSetName}[${idx}].nationality`}
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
                blurHandler={() => {
                  setFieldTouched(`${fieldSetName}[${idx}].nationality`, true);
                }}
              />
            </Col>

            <Col md={4}>
              <label className="form-label">Date of birth</label>
              <Row>
                <Col md={4} className="mp-0">
                  <CstSelectValidateField
                    name={`${fieldSetName}[${idx}].dobDate`}
                    placeholder="date"
                    clazzName={
                      isError(fieldSetName, idx, errors, touched, "dobDate").cls
                    }
                    errorMsg={
                      isError(fieldSetName, idx, errors, touched, "dobDate").msg
                    }
                    blurHandler={() => {
                      setFieldTouched(`${fieldSetName}[${idx}].dobDate`, true);
                    }}
                    options={getNmsOptions(31, 1, 0)}
                    onChange={(item) => {
                      setFieldValue(
                        `${fieldSetName}[${idx}].dobDate`,
                        item && item.value
                      );
                    }}
                    arrowStatus={false}
                    isSmall={true}
                  />
                </Col>
                <Col md={4} className="mp-0">
                  <CstSelectValidateField
                    name={`${fieldSetName}[${idx}].dobMonth`}
                    placeholder="Month"
                    clazzName={
                      isError(fieldSetName, idx, errors, touched, "dobMonth")
                        .cls
                    }
                    errorMsg={
                      isError(fieldSetName, idx, errors, touched, "dobMonth")
                        .msg
                    }
                    blurHandler={() => {
                      setFieldTouched(`${fieldSetName}[${idx}].dobMonth`, true);
                    }}
                    options={getNmsOptions(12, 1, 0)}
                    onChange={(item) => {
                      setFieldValue(
                        `${fieldSetName}[${idx}].dobMonth`,
                        item && item.value
                      );
                    }}
                    arrowStatus={false}
                    isSmall={true}
                  />
                </Col>
                <Col md={4} className="mp-0">
                  <CstSelectValidateField
                    name={`${fieldSetName}[${idx}].dobYear`}
                    placeholder="Year"
                    clazzName={
                      isError(fieldSetName, idx, errors, touched, "dobYear").cls
                    }
                    errorMsg={
                      isError(fieldSetName, idx, errors, touched, "dobYear").msg
                    }
                    blurHandler={() => {
                      setFieldTouched(`${fieldSetName}[${idx}].dobYear`, true);
                    }}
                    options={getNmsOptions(12, 1, 1)}
                    onChange={(item) => {
                      setFieldValue(
                        `${fieldSetName}[${idx}].dobYear`,
                        item && item.value
                      );
                    }}
                    arrowStatus={false}
                    isSmall={true}
                  />
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className="input-area-row">
            <Col md={4}>
              <label
                className="form-label"
                htmlFor={`${fieldSetName}[${idx}].passportNo`}
              >
                Passport Number
              </label>
              <Field
                className={`form-control ${
                  isError(fieldSetName, idx, errors, touched, "passportNo").cls
                }`}
                type="text"
                name={`${fieldSetName}[${idx}].passportNo`}
                placeholder="Password"
              />
              <div className="invalid-feedback">
                {isError(fieldSetName, idx, errors, touched, "passportNo").msg}
              </div>
            </Col>
            <Col md={4}>
              <CstSelectValidateField
                name={`${fieldSetName}[${idx}].passportIssuCountry`}
                label="Passport Issuing Country"
                placeholder="Passport Issuing Country"
                blurHandler={() => {
                  setFieldTouched(
                    `${fieldSetName}[${idx}].passportIssuCountry`,
                    true
                  );
                }}
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
                onChange={(item) => {
                  setFieldValue(
                    `${fieldSetName}[${idx}].passportIssuCountry`,
                    item && item.value
                  );
                }}
              />
            </Col>
            <Col md={4}>
              <label className="form-label">Passport Expiry Date</label>
              <Row>
                <Col md={4} className="mp-0">
                  <CstSelectValidateField
                    name={`${fieldSetName}[${idx}].pasExpDate`}
                    placeholder="date"
                    clazzName={
                      isError(fieldSetName, idx, errors, touched, "pasExpDate")
                        .cls
                    }
                    errorMsg={
                      isError(fieldSetName, idx, errors, touched, "pasExpDate")
                        .msg
                    }
                    blurHandler={() => {
                      setFieldTouched(
                        `${fieldSetName}[${idx}].pasExpDate`,
                        true
                      );
                    }}
                    onChange={(item) => {
                      setFieldValue(
                        `${fieldSetName}[${idx}].pasExpDate`,
                        item && item.value
                      );
                    }}
                    options={getNmsOptions(31, 1, 0)}
                    isSmall={true}
                    arrowStatus={false}
                  />
                </Col>
                <Col md={4} className="mp-0">
                  <CstSelectValidateField
                    name={`${fieldSetName}[${idx}].pasExpMonth`}
                    placeholder="Month"
                    blurHandler={() => {
                      setFieldTouched(
                        `${fieldSetName}[${idx}].pasExpMonth`,
                        true
                      );
                    }}
                    clazzName={
                      isError(fieldSetName, idx, errors, touched, "pasExpMonth")
                        .cls
                    }
                    errorMsg={
                      isError(fieldSetName, idx, errors, touched, "pasExpMonth")
                        .msg
                    }
                    onChange={(item) => {
                      setFieldValue(
                        `${fieldSetName}[${idx}].pasExpMonth`,
                        item && item.value
                      );
                    }}
                    options={getNmsOptions(12, 1, 0)}
                    arrowStatus={false}
                    isSmall={true}
                  />
                </Col>
                <Col md={4} className="mp-0">
                  <CstSelectValidateField
                    name={`${fieldSetName}[${idx}].pasExpYear`}
                    blurHandler={() => {
                      setFieldTouched(
                        `${fieldSetName}[${idx}].pasExpYear`,
                        true
                      );
                    }}
                    placeholder="Year"
                    clazzName={
                      isError(fieldSetName, idx, errors, touched, "pasExpYear")
                        .cls
                    }
                    errorMsg={
                      isError(fieldSetName, idx, errors, touched, "pasExpYear")
                        .msg
                    }
                    onChange={(item) => {
                      setFieldValue(
                        `${fieldSetName}[${idx}].pasExpYear`,
                        item && item.value
                      );
                    }}
                    options={getNmsOptions(12, 1, 2)}
                    arrowStatus={false}
                    isSmall={true}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="input-area-row">
            <Col md={6}>
              <CstUploadFileFieldValidet
                blurHandler={() => {}}
                label="Passport Image"
                changeHandler={(file) => {}}
              />
            </Col>
            <Col md={6}>
              <CstUploadFileFieldValidet
                label="Visa Image"
                changeHandler={(file) => {}}
                blurHandler={() => {}}
              />
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
