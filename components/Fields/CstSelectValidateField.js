import React from "react";
import Select from "react-select";

const CstSelectValidateField = ({
  name,
  label = undefined,
  placeholder,
  options,
  onChange,
  handleBlur,
  clazzName,
  errorMsg,
}) => {
  return (
    <React.Fragment>
      {label ? (
        <label className="form-label" htmlFor={name}>
          {label}
        </label>
      ) : (
        ""
      )}
      <Select
        aria-label={name}
        name={name}
        id={name}
        placeholder={placeholder}
        options={options}
        onBlur={handleBlur}
        onChange={(item) => {
          onChange(item);
        }}
        className={`vselect-item ${clazzName}`}
      />

      <div className="invalid-feedback">{errorMsg}</div>
    </React.Fragment>
  );
};

export default CstSelectValidateField;
