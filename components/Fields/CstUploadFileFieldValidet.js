import { Field } from "formik";
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
    accept,
  } = params;

  const changeImageAction = (e) => {
    e.preventDefault();
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

    if (errors) {
      if (!isEmptyString(errors[name])) {
        errObj = { cls: "is-invalid", msg: errors[name], status: true };
      }
    }

    return errObj;
  };

  return (
    <React.Fragment>
      <Row>
        <Col md={8} className="cst-uplod-file">
          <Field
            className={`form-control ${getError() && getError().cls} `} //esIsFieldError()
            placeholder={placeholder}
            title={placeholder}
            type="file"
            accept={accept}
            name={name}
            id={name}
            onBlur={(e) => {
              e.preventDefault();
              setFieldTouched && setFieldTouched(name, true);
            }}
            onChange={(e) => {
              e.preventDefault();
              changeImageAction(e);
              uploadFile && uploadFile(e.currentTarget.files[0]);
              setFieldValue && setFieldValue(name, e.currentTarget.files[0]);
            }}
            value=""
          />
          <label className="form-label file-label" htmlFor={name}>
            <span className="icon">
              {" "}
              <i className="fas fa-cloud-upload-alt"></i>
            </span>
            <span className="text">{label}</span>
          </label>
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
