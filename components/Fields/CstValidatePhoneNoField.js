import { Field } from "formik";
import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  esIsFieldError,
  helperIsEmpty,
  isEmptyString,
} from "../../utils/helper/helperAction";
import CstSelectValidateField from "./CstSelectValidateField";

const CstValidatePhoneNoField = (props) => {
  const {
    codeName,
    fileldName,
    codePlaceholder,
    filedPlaceholder,
    handleChange,
    setFieldTouched,
    setFieldValue,
    options,
    values,
    checkIsValid = true,
    errors,
    touched,
  } = props;

  const getIsValided = (name) => {
    let valid = { status: false, msg: "", cls: "" };
    if (checkIsValid) {
      valid = esIsFieldError(errors, touched, name);
    } else {
      if (!isEmptyString(values[name])) {
        valid = esIsFieldError(errors, touched, name);
      }
    }
    if (!helperIsEmpty(errors)) {
      if (errors[name] !== undefined && errors[name] !== null) {
        valid = { status: true, msg: errors[name], cls: "is-invalid" };
      }
    }
    return valid;
  };

  const getIsValidedMsg = (name, code) => {
    let pValid = getIsValided(name);
    let cValid = getIsValided(code);

    let msg = {msg:"", cls:""};
    if (cValid.status) {
      msg = {msg:cValid.msg, cls:" active "};
    }

    if (pValid.status) {
      msg = {msg:pValid.msg, cls:" active "};
    }
    return msg;
  };
  return (
    <React.Fragment>
      <Row className="cstf-phone">
        <Col md={3} className="cstf-select-opt">
          <Row>
            <Col md={12}>
              {console.log("Phone Code Class, ", getIsValided(codeName))}
              <CstSelectValidateField
                arrowStatus={false}
                isSmall={true}
                blurHandler={() => {
                  setFieldTouched(codeName, true);
                }}
                clazzName={getIsValided(codeName).cls}
                name={codeName}
                placeholder={codePlaceholder}
                options={options}
                onChange={(item) => {
                  let value = !helperIsEmpty(item)
                    ? !helperIsEmpty(item.value)
                      ? item.value
                      : ""
                    : "";
                  setFieldValue(codeName, value);
                }}
                defaultStringVal={values && values[codeName]}
              />
            </Col>
          </Row>
        </Col>
        <Col md={9} className="cstf-text">
          <Field
            placeholder={filedPlaceholder}
            name={fileldName}
            onChange={handleChange}
            onBlur={() => {
              setFieldTouched(fileldName, true);
            }}
            id={fileldName}
            className={`form-control ${getIsValided(fileldName).cls}`}
            value={values && values[fileldName]}
          />
          <div className={`invalid-feedback ${getIsValidedMsg(fileldName, codeName).cls}`}>
            {getIsValidedMsg(fileldName, codeName).msg}
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default CstValidatePhoneNoField;
