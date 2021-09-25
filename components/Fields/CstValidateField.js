import { Field } from "formik";
import React from "react";
import { Col } from "react-bootstrap";
import { esIsFieldError, isEmptyString } from "../../utils/helper/helperAction";

/**
 *
 * @param {placeholder, name, label, errors, touched, handleChange, handleBlur} params
 * @returns Validate Field Using BootStarp & Formik
 */
const CstValidateField = ({
  placeholder,
  label = undefined,
  name,
  errors,
  touched,
  handleChange,
  handleBlur,
  type = undefined,
  checkIsValid=true,
  values,
}) => {

  const getIsValided = ()=>{

    if(checkIsValid){
      return esIsFieldError(errors, touched, name).cls;
    }else{
      if(!isEmptyString(values[name])){
        return esIsFieldError(errors, touched, name).cls;
      }
    }
    return "";
  }

  return (
    <React.Fragment>
      {label ? (
        <label className="form-label" htmlFor={name}>
          {label}
        </label>
      ) : (
        ""
      )}

      <Field
        placeholder={placeholder}
        type={type ? type : "text"}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        id={name}
        className={`form-control ${getIsValided()}`}
      />
      <div className="invalid-feedback">
        {esIsFieldError(errors, touched, name).msg}
      </div>
    </React.Fragment>
  );
};

export default CstValidateField;
