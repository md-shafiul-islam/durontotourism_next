import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import {
  esIsFieldError,
  esIsFunction,
  helperIsEmpty,
  isEmptyString,
} from "../../utils/helper/helperAction";
import Thumb from "../layout/Thumb";

/**
 * 
 * @param {label,
    name,
    placeholder,
    clazzName,
    errorMsg,
    setFieldValue,
    setFieldTouched} params 
 * @returns single File
 */

const CstUploadFileFieldValidet = (params) => {
  console.log("CstUploadFileFieldValidet Params ", params);

  const [attachFile, setAttachFile] = useState(null);

  let {
    label,
    name,
    placeholder,
    errors,
    setFieldTouched,
    setFieldValue,
    touched,
    uploadFile,
    isError = undefined,
    isValidCheck = true,
    values,
  } = params;

  const changeImageAction = (e) => {
    if (e.currentTarget.files !== undefined) {
      setAttachFile(e.currentTarget.files[0]);
    }
  };

  const getError = () => {
    let errObj = { cls: "", msg: "", status: false };

    if (isValidCheck) {
      if (esIsFunction(isError)) {
        errObj = isError(errors, touched, name);
      } else {
        errObj = esIsFieldError(errors, touched, name);
      }
    }

    if (!isEmptyString(errors[name])) {
      errObj = { cls: "is-invalid", msg: errors[name], status: true };
    }

    return errObj;
  };

  return (
    <React.Fragment>
      <Row>
        <Col md={8}>
          {label ? (
            <label className="form-label" htmlFor={name}>
              {label}
            </label>
          ) : (
            ""
          )}
          <input
            className={`form-control ${getError() && getError().cls} `} //esIsFieldError()
            placeholder={placeholder}
            title={placeholder}
            type="file"
            name={name}
            id={name}
            onBlur={() => {
              setFieldTouched(name, true);
            }}
            onChange={(e) => {
              changeImageAction(e);
              uploadFile(e.currentTarget.files[0]);
              setFieldValue(name, e.currentTarget.files[0]);
            }}
          />
          <div className="invalid-feedback">{getError() && getError().msg}</div>
        </Col>
        <Col md={4}>
          <Thumb file={attachFile} />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default CstUploadFileFieldValidet;
