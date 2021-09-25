import React from "react";
import Select, { components } from "react-select";

const CstSelectValidateField = ({
  arrowStatus = true,
  name,
  label = undefined,
  placeholder,
  options,
  onChange,
  blurHandler,
  clazzName,
  errorMsg,
  isSmall = false,
  defaultStringVal,
  defaultOption
}) => {
  const getCommponetSets = () => {
    if (!arrowStatus) {
      return {
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
      };
    }

    return null;
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
      {console.log("IsSmall ", isSmall)}
      <Select
        aria-label={name}
        name={name}
        id={name}
        placeholder={placeholder}
        options={options}
        onBlur={() => {
          blurHandler();
        }}
        onChange={(item) => {
          onChange(item);
        }}
        className={`${
          isSmall ? "vselect-sm-item " : "vselect-item "
        }${clazzName}`}
        components={getCommponetSets()}
        defaultInputValue={defaultStringVal ? defaultStringVal : ""}
        defaultValue={defaultOption ? defaultOption : null}
        
      />

      <div className="invalid-feedback">{errorMsg}</div>
    </React.Fragment>
  );
};

export default CstSelectValidateField;
