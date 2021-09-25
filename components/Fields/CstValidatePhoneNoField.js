import { Field } from "formik";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { isEmptyString } from "../../utils/helper/helperAction";
import CstSelectValidateField from "./CstSelectValidateField";

const CstValidatePhoneNoField = (props) => {
  console.log("CstValidatePhoneNoField Props, ", props);

  const {
    codeName,
    fileldName,
    codePlaceholder,
    filedPlaceholder,
    handleBlur,
    handleChange,
    setFieldTouched,
    setFieldValue,
    options,
    clazzName,
    errorMsg,
    values,
    checkIsValid = true,
  } = props;

  const getIsValided = ()=>{

    if(checkIsValid){
      return clazzName;
    }else{
      if(!isEmptyString(values[fileldName])){
        return clazzName;
      }
    }
    return "";
  }

  return (
    <React.Fragment>
      <Row className="cstf-phone">
        <Col md={3} className="cstf-select-opt">
          <Row>
            <Col md={12}>
              <CstSelectValidateField
                arrowStatus={false}
                isSmall={true}
                blurHandler={() => {
                  setFieldTouched(fileldName, true);
                }}
                clazzName={getIsValided()}
                name={codeName}
                placeholder={codePlaceholder}
                options={options}
                onChange={(item) => {
                  setFieldValue(codeName, item && item.value);
                }}
                defaultStringVal={values && values[codeName]}
              />
            </Col>
          </Row>
        </Col>
        <Col md={9} className="cstf-text">
          <input
            placeholder={filedPlaceholder}
            name={fileldName}
            onChange={handleChange}
            onBlur={handleBlur}
            id={fileldName}
            className={`form-control ${getIsValided()}`}
            value={values && values[fileldName]}
            autoComplete="off"
          />
          <div className="invalid-feedback">{errorMsg}</div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default CstValidatePhoneNoField;
