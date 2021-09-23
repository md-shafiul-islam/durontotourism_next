import React, {useState} from "react";
import { Col, Row } from "react-bootstrap";
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
  const [attachFile, setAttachFile] = useState(null);
  let {
    label,
    name,
    placeholder,
    clazzName,
    errorMsg,
    changeHandler,
    blurHandler
  } = params;

  const changeImageAction = (e) => {
    if (e.currentTarget.files !== undefined) {
      setAttachFile(e.currentTarget.files[0]);
    }
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
            className={`form-control ${clazzName}`}
            placeholder={placeholder}
            type="file"
            name={name}
            id={name}
            onBlur={() => {
              blurHandler();
            }}
            onChange={(e) => {
              changeImageAction(e);
              changeHandler(name, e.currentTarget.files[0]);
            }}
          />
          <div className="invalid-feedback">{errorMsg}</div>
        </Col>
        <Col md={4}>
          <Thumb file={attachFile} />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default CstUploadFileFieldValidet;
