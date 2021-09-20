import { Field } from "formik";
import React from "react";
import { Col } from "react-bootstrap";
import { esIsFieldError } from "../../utils/helper/helperAction";

/**
 *
 * @param {placeholder, name, label, errors, touched, handleChange, handleBlur} params
 * @returns Validate Field Using BootStarp & Formik
 */
const CstValidateField = ({
  placeholder,
  label,
  name,
  errors,
  touched,
  handleChange,
  handleBlur,
}) => {
  return (
    <React.Fragment>
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <Field
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        id={name}
        className={`form-control ${esIsFieldError(errors, touched, name).cls}`}
      />
      <div className="invalid-feedback">
        {esIsFieldError(errors, touched, name).msg}
      </div>
    </React.Fragment>
  );
};

export default CstValidateField;
