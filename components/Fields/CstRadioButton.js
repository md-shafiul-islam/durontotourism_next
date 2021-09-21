import { Field } from "formik";
import React from "react";
import { esIsFieldError } from "../../utils/helper/helperAction";
const CstRadioButton = ({
  name,
  idKey,
  errors,
  touched,
  handleChange,
  handleBlur,
}) => {
  return (
    <React.Fragment>
      <div
        className={`gender-info ${esIsFieldError(errors, touched, name).cls}`}
      >
        <label className="gender-label">
          <Field
            type="radio"
            name={name}
            value="Male"
            id={`${idKey}-gender-male`}
          />
          <span className="gen-text">Male</span>
        </label>

        <label className="gender-label">
          <Field
            type="radio"
            name={name}
            value="Female"
            id={`${idKey}-gender-female`}
          />
          <span className="gen-text">Female</span>
        </label>
      </div>

      <div className="invalid-feedback">
        {esIsFieldError(errors, touched, "gender").msg}
      </div>
    </React.Fragment>
  );
};

export default CstRadioButton;
