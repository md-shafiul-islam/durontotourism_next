import { Field } from "formik";
import React from "react";
import {
  esIsFieldError,
  isEmptyString,
} from "../../utils/helper/helperAction";

/**
 *
 * @param {placeholder, name, label, errors, touched, handleChange, handleBlur} params
 * @returns Validate Field Using BootStarp & Formik
 */
const CstValidateField = ({
  placeholder,
  label = undefined,
  name,
  clazzName,
  errors,
  touched,
  handleChange,
  handleBlur,
  type = undefined,
  checkIsValid = true,
  values,
}) => {
  const getIsValided = () => {
    let err = { cls: "", msg: "", status: false };
    if (checkIsValid) {
      err = esIsFieldError(errors, touched, name);
    } else {
      if (!isEmptyString(values[name])) {
        err = esIsFieldError(errors, touched, name);
      }
    }

    if (errors !== undefined && errors !== null) {
      console.log("Cst VF Have Error, ", errors);
      if (errors[name] !== undefined && errors[name] !== null) {
        console.log("Befor Return Cst VF Have Error, ", errors);

        err = { cls: "is-invalid", msg: errors[name], status: true };
      }
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
        {getIsValided() && getIsValided().msg}
      </div>
    </React.Fragment>
  );
};

export default CstValidateField;
