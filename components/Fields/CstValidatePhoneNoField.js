import React, { useState } from "react";
import { Field } from "formik";
import { Col, Row } from "react-bootstrap";
import {
  esIsFieldError,
  helperIsEmpty,
  isEmptyString,
} from "../../utils/helper/helperAction";
import CstSelectPhoneValidateField from "./CstSelectPhoneValidateField";

const CstValidatePhoneNoField = (props) => {
  const {
    codeName,
    clazzName,
    fileldName,
    filedPlaceholder,
    handleChange,
    options,
    values,
    checkIsValid,
    errors,
    touched,
  } = props;

  const [selectedItem, setSelectedItem] = useState(null);

  const getIsValided = (name) => {
    let valid = { status: false, msg: "", cls: "" };
    if (name) {
      if (checkIsValid) {
        valid = esIsFieldError(errors, touched, name);
      } else {
        if (values) {
          if (!isEmptyString(values[name])) {
            valid = esIsFieldError(errors, touched, name);
          }
        }
      }
      if (!helperIsEmpty(errors)) {
        if (errors[name] !== undefined && errors[name] !== null) {
          valid = { status: true, msg: errors[name], cls: "is-invalid" };
        }
      }
    }
    return valid;
  };

  const getIsValidedMsg = (name, code) => {
    let pValid = getIsValided(name);
    let cValid = getIsValided(code);

    let msg = { msg: "", cls: "" };
    if (cValid.status) {
      msg = { msg: cValid.msg, cls: " active " };
    }

    if (pValid.status) {
      msg = { msg: pValid.msg, cls: " active " };
    }
    return msg;
  };

  const getPlaceholder = () => {
    if (selectedItem !== null) {
      if (selectedItem.isoCode === "BD") {
        return "e.g. 01700000000, 018xxxxxxx";
      }
    }

    return filedPlaceholder;
  };

  return (
    <React.Fragment>
      <Row className={`cstf-phone ${clazzName}`}>
        <Col md={4} className={`cstf-select-opt`}>
          <Row>
            <Col md={12}>
              {console.log("Phone Code Class, ", getIsValided(codeName))}

              <CstSelectPhoneValidateField
                onChange={(item) => {
                  props.setFieldValue(codeName, item ? item.dialCode : null);
                  setSelectedItem(item);
                }}
                blurHandler={() => {
                  props.setFieldTouched(codeName, true);
                }}
                options={props.options}
                placeholder={"Dial Code"}
              />
            </Col>
          </Row>
        </Col>
        <Col md={8} className="cstf-text">
          <Field
            placeholder={getPlaceholder()}
            name={fileldName}
            onChange={handleChange}
            onBlur={() => {
              props.setFieldTouched(fileldName, true);
            }}
            id={fileldName}
            className={`form-control ${getIsValided(fileldName).cls}`}
            value={values && values[fileldName]}
          />
          <div
            className={`invalid-feedback ${
              getIsValidedMsg(fileldName, codeName).cls
            }`}
          >
            {getIsValidedMsg(fileldName, codeName).msg}
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default CstValidatePhoneNoField;
