import { Field } from "formik";
import React from "react";
import { esIsFieldError, isEmptyString } from "../../utils/helper/helperAction";

/**
 *
 * @param {placeholder, name, label, errors, touched, handleChange, handleBlur} params
 * @returns Validate Field Using BootStarp & Formik
 */
const SignInValidateField = ({
  placeholder,
  label = undefined,
  name,
  clazzName,
  handleChange,
  handleBlur,
  type = undefined,
  values,
  msg,
  status,
  msgStatus,
  errorStatus,
  ...props
}) => {
  const getIsValided = () => {
    let err = { cls: "", msg: "", status: status };
    if (!errorStatus) {
      err = { cls: "", msg: "", status: status };
    } else {
      err = { cls: "is-invalid", msg: msg, status: true };
    }
    return err;
  };

  return (
    <React.Fragment>
      {label ? (
        <label className="form-label" htmlFor={name}>
          {label}
        </label>
      ) : (
        ""
      )}
      {console.log("Cst Field Error ", getIsValided())}
      <Field
        placeholder={placeholder}
        type={type ? type : "text"}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        id={name}
        className={`form-control ${clazzName} ${getIsValided().cls}`}
      />
      <div className="invalid-feedback">
        {msgStatus ? getIsValided() && getIsValided().msg : ""}
      </div>
    </React.Fragment>
  );
};

export default SignInValidateField;
