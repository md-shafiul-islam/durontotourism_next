import { is } from "date-fns/locale";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { esIsFieldError, esIsFunction } from "../../utils/helper/helperAction";
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
  const [errorState, setErrorState] = useState({clazzName:"", status:false, msg:""});
  let {
    label,
    name,
    placeholder,
    errors,
    setFieldTouched,
    setFieldValue,
    touched,
    uploadFile,
    isError = undefined
  } = params;

  const changeImageAction = (e) => {
    if (e.currentTarget.files !== undefined) {
      setAttachFile(e.currentTarget.files[0]);
    }
  };

  const getError = ()=>{
  
    if(esIsFunction(isError)){
      return isError(errors, touched, name);
    }else{
      return esIsFieldError(errors, touched, name);
    }
  }  

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
            className={`form-control ${getError().cls} `} //esIsFieldError()
            placeholder={placeholder}
            type="file"
            name={name}
            id={name}
            onBlur={() => {
              setFieldTouched(name, true);
            }}
            onChange={(e) => {
              changeImageAction(e);
              uploadFile(e.currentTarget.files[0]);
              setFieldTouched(name, e.currentTarget.files[0]);
              getError();
            }}
          />
          <div className="invalid-feedback">{getError().msg}</div>
        </Col>
        <Col md={4}>
          <Thumb file={attachFile} />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default CstUploadFileFieldValidet;
